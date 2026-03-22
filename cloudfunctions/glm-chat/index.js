const cloud = require('wx-server-sdk');
const axios = require('axios');
const localConfig = require('./local.config');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const PROVIDERS = {
  bigmodel: {
    name: '智谱 GLM-4.7-Flash',
    endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
  },
  siliconflow: {
    name: '硅基流动 Qwen/Qwen3.5-4B',
    endpoint: 'https://api.siliconflow.cn/v1/chat/completions',
  },
  openrouter: {
    name: 'OpenRouter openrouter/free',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
  },
};

function normalizeContent(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item.text === 'string') return item.text;
        if (item && typeof item.content === 'string') return item.content;
        return '';
      })
      .filter(Boolean)
      .join('\n');
  }
  return '';
}

exports.main = async (event) => {
  const { provider = 'bigmodel', model, messages = [] } = event || {};
  const providerMeta = PROVIDERS[provider];
  if (!providerMeta) {
    throw new Error(`不支持的 provider: ${provider}`);
  }

  const providerConfig = localConfig.providers?.[provider];
  if (!providerConfig?.apiKey) {
    throw new Error(`请先在 local.config.js 中配置 ${provider} 的 apiKey`);
  }

  const endpoint = providerConfig.endpoint || providerMeta.endpoint;
  const requestModel = model || providerConfig.defaultModel;
  if (!requestModel) {
    throw new Error(`请为 ${provider} 配置 defaultModel，或在请求里传入 model`);
  }

  const headers = {
    Authorization: `Bearer ${providerConfig.apiKey}`,
    'Content-Type': 'application/json',
    ...(providerConfig.extraHeaders || {}),
  };

  const response = await axios.post(
    endpoint,
    {
      model: requestModel,
      stream: false,
      temperature: 0.7,
      messages,
    },
    {
      headers,
      timeout: providerConfig.timeout || 60000,
    },
  );

  const content = normalizeContent(response?.data?.choices?.[0]?.message?.content).trim();
  if (!content) {
    throw new Error('模型未返回有效内容');
  }

  return {
    provider,
    providerName: providerMeta.name,
    model: response?.data?.model || requestModel,
    content,
    usage: response?.data?.usage || null,
  };
};

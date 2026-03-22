module.exports = {
  providers: {
    bigmodel: {
      apiKey: '请填写你的智谱 API Key',
      endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      defaultModel: 'glm-4.7-flash',
    },
    siliconflow: {
      apiKey: '请填写你的硅基流动 API Key',
      endpoint: 'https://api.siliconflow.cn/v1/chat/completions',
      defaultModel: 'Qwen/Qwen3.5-4B',
    },
    openrouter: {
      apiKey: '请填写你的 OpenRouter API Key',
      endpoint: 'https://openrouter.ai/api/v1/chat/completions',
      defaultModel: 'openrouter/free',
      extraHeaders: {
        'HTTP-Referer': 'https://localhost.test',
        'X-Title': 'wechat-mini-program-local-test',
      },
    },
  },
};

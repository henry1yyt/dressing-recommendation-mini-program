//使用时候把秘钥改成自己实际的api key，去掉本文件的example即可正常使用
module.exports = {
  providers: {
    bigmodel: {
      apiKey: '你的api秘钥',
      endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      defaultModel: 'glm-4.7-flash',
    },
    siliconflow: {
      apiKey: '你的api秘钥',
      endpoint: 'https://api.siliconflow.cn/v1/chat/completions',
      defaultModel: 'Qwen/Qwen3.5-4B',
    },
    openrouter: {
      apiKey: '你的api秘钥',
      endpoint: 'https://openrouter.ai/api/v1/chat/completions',
      defaultModel: 'openrouter/free',
      extraHeaders: {
        'HTTP-Referer': 'https://your-app.example.com',
        'X-Title': 'wechat-mini-program-ai-chat'
      }
    }
  }
};

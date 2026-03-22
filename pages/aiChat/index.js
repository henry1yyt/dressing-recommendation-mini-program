const aiLocalConfig = require('../../config/ai.local');

const MODEL_OPTIONS = [
  {
    label: '智谱 GLM-4.7-Flash（免费）',
    provider: 'bigmodel',
    model: 'glm-4.7-flash',
  },
  {
    label: '硅基流动 Qwen/Qwen3.5-4B（本地测试）',
    provider: 'siliconflow',
    model: 'Qwen/Qwen3.5-4B',
  },
  {
    label: 'OpenRouter openrouter/free（本地测试）',
    provider: 'openrouter',
    model: 'openrouter/free',
  },
];

const MODEL_LABELS = MODEL_OPTIONS.map((item) => item.label);

const STORAGE_KEY = 'ai_chat_history_v2';
const MODEL_STORAGE_KEY = 'ai_chat_model_index_v1';

const SYSTEM_PROMPT = `
你是一名专业的服装搭配大师、形象顾问和时尚买手。
你擅长根据用户的性别、年龄、身材、肤色、预算、天气、场景和风格偏好，
给出具体、实用、容易执行的穿搭建议。

请严格遵循以下规则：
1. 优先给出适合真实日常场景的建议，不要空泛。
2. 回答尽量清晰分点，优先包含：整体风格、上装、下装、鞋子、配饰、颜色搭配。
3. 如果用户提供的信息不够，先主动追问 1 到 3 个关键问题，再继续推荐。
4. 如果用户预算有限，要优先推荐基础款、好搭配、性价比高的方案。
5. 如果用户有场景需求，例如通勤、约会、面试、旅行、拍照、见家长，请按场景优化。
6. 如果用户描述体型问题，例如显胖、显矮、肩宽、胯宽、腿粗，请优先考虑修饰身材的搭配方案。
7. 回答风格专业但亲切，不要像销售话术，不要过度夸张。
8. 尽量避免抽象建议，要给出可以直接照着穿的搭配示例。
9. 优先推荐现实生活中容易买到、容易搭配、容易穿得好看的单品。
10. 当用户询问穿搭时，尽量按以下结构回答：
- 场景判断
- 推荐穿搭方案
- 配色建议
- 避坑提醒
- 可替代单品
`.trim();

function createMessage(role, content, extra = {}) {
  return {
    id: `${role}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    role,
    content,
    time: Date.now(),
    ...extra,
  };
}

function createWelcomeMessage(option) {
  return createMessage(
    'assistant',
    `你好，我是你的 AI 穿搭助手。当前使用：${option.label}。\n\n你可以直接告诉我天气、场景、预算、风格偏好，或者直接问我：\n1. 明天上班怎么穿\n2. 约会怎么搭\n3. 显高显瘦怎么穿`,
  );
}

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

function requestChat({ provider, model, messages }) {
  const providerConfig = aiLocalConfig.providers?.[provider];

  if (!providerConfig) {
    return Promise.reject(new Error(`不支持的 provider: ${provider}`));
  }

  if (!providerConfig.apiKey) {
    return Promise.reject(new Error(`请先在 config/ai.local.js 中填写 ${provider} 的 apiKey`));
  }

  const endpoint = providerConfig.endpoint;
  const requestModel = model || providerConfig.defaultModel;

  return new Promise((resolve, reject) => {
    wx.request({
      url: endpoint,
      method: 'POST',
      timeout: 60000,
      header: {
        Authorization: `Bearer ${providerConfig.apiKey}`,
        'Content-Type': 'application/json',
        ...(providerConfig.extraHeaders || {}),
      },
      data: {
        model: requestModel,
        stream: false,
        temperature: 0.7,
        messages,
      },
      success(res) {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          const message =
            res.data?.error?.message ||
            res.data?.message ||
            `请求失败（HTTP ${res.statusCode}）`;
          reject(new Error(message));
          return;
        }

        const content = normalizeContent(res.data?.choices?.[0]?.message?.content).trim();

        if (!content) {
          reject(new Error('模型未返回有效内容'));
          return;
        }

        resolve({
          provider,
          providerName: MODEL_OPTIONS.find((item) => item.provider === provider)?.label || provider,
          model: res.data?.model || requestModel,
          content,
        });
      },
      fail(err) {
        reject(new Error(err?.errMsg || '网络请求失败'));
      },
    });
  });
}

Page({
  data: {
    inputValue: '',
    messages: [],
    loading: false,
    anchorId: 'bottom',
    keyboardHeight: 0,

    modelOptions: MODEL_OPTIONS,
    modelLabels: MODEL_LABELS,
    selectedModelIndex: 0,
    currentModelLabel: MODEL_LABELS[0],
  },

  onLoad() {
    const savedIndex = Number(wx.getStorageSync(MODEL_STORAGE_KEY) || 0);
    const selectedModelIndex = Number.isNaN(savedIndex)
      ? 0
      : Math.max(0, Math.min(savedIndex, MODEL_OPTIONS.length - 1));

    this.setData({
      selectedModelIndex,
      currentModelLabel: MODEL_LABELS[selectedModelIndex] || MODEL_LABELS[0],
    });

    this.initMessages();
  },

  onShow() {
    wx.nextTick(() => this.scrollToBottom());
  },

  getCurrentModelOption() {
    return MODEL_OPTIONS[this.data.selectedModelIndex] || MODEL_OPTIONS[0];
  },

  initMessages() {
    const history = wx.getStorageSync(STORAGE_KEY);

    if (Array.isArray(history) && history.length) {
      this.setData({ messages: history });
      return;
    }

    const welcomeMessage = createWelcomeMessage(this.getCurrentModelOption());
    this.setData({ messages: [welcomeMessage] });
    this.persistMessages([welcomeMessage]);
  },

  persistMessages(messages) {
    wx.setStorageSync(STORAGE_KEY, messages);
  },

  scrollToBottom() {
    this.setData({ anchorId: 'bottom' });
  },

  handleInput(event) {
    this.setData({ inputValue: event.detail.value });
  },

  handleKeyboardHeightChange(event) {
    const { height = 0 } = event.detail || {};
    this.setData({ keyboardHeight: height });
    wx.nextTick(() => this.scrollToBottom());
  },

  handleBlur() {
    this.setData({ keyboardHeight: 0 });
  },

  handleModelChange(event) {
    const selectedModelIndex = Number(event.detail.value || 0);

    this.setData({
      selectedModelIndex,
      currentModelLabel: MODEL_LABELS[selectedModelIndex] || MODEL_LABELS[0],
    });

    wx.setStorageSync(MODEL_STORAGE_KEY, selectedModelIndex);
  },

  startNewChat() {
    wx.showModal({
      title: '新对话',
      content: '是否开始一段新的对话？当前聊天记录会被重置。',
      success: ({ confirm }) => {
        if (!confirm) return;

        const welcomeMessage = createWelcomeMessage(this.getCurrentModelOption());

        this.setData({
          messages: [welcomeMessage],
          inputValue: '',
          loading: false,
        });

        this.persistMessages([welcomeMessage]);

        wx.nextTick(() => this.scrollToBottom());
      },
    });
  },

  buildRequestMessages(messages) {
    const chatMessages = messages
      .filter((item) => item.role === 'user' || item.role === 'assistant')
      .slice(-20)
      .map((item) => ({
        role: item.role,
        content: item.content,
      }));

    return [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      ...chatMessages,
    ];
  },

  async handleSend() {
    const content = (this.data.inputValue || '').trim();
    if (!content || this.data.loading) return;

    const historyMessages = [...this.data.messages];
    const userMessage = createMessage('user', content);
    const pendingMessage = createMessage('assistant', '正在思考中...', { loading: true });
    const tempMessages = [...historyMessages, userMessage, pendingMessage];
    const modelOption = this.getCurrentModelOption();

    this.setData({
      inputValue: '',
      loading: true,
      messages: tempMessages,
    });

    wx.nextTick(() => this.scrollToBottom());

    try {
      const res = await requestChat({
        provider: modelOption.provider,
        model: modelOption.model,
        messages: this.buildRequestMessages([...historyMessages, userMessage]),
      });

      const reply = res?.content || '模型没有返回内容。';
      const providerName = res?.providerName ? `\n\n—— ${res.providerName}` : '';

      const nextMessages = [
        ...historyMessages,
        userMessage,
        createMessage('assistant', `${reply}${providerName}`),
      ];

      this.setData({
        messages: nextMessages,
        loading: false,
      });

      this.persistMessages(nextMessages);
    } catch (error) {
      const nextMessages = [
        ...historyMessages,
        userMessage,
        createMessage(
          'assistant',
          `出错了：${error?.message || error?.errMsg || '请求失败'}\n\n本地测试版请检查：\n1. config/ai.local.js 里是否填写了对应平台 API Key\n2. 微信开发者工具是否已勾选“不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书”\n3. 当前网络是否可直连对应接口域名`,
          { error: true },
        ),
      ];

      this.setData({
        messages: nextMessages,
        loading: false,
      });

      this.persistMessages(nextMessages);
    }

    wx.nextTick(() => this.scrollToBottom());
  },
});
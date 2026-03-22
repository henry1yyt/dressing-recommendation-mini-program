# TDesign 通用页面模板

基于 TDesign 打造的通用页面模板，包含通用的登陆注册、个人中心、设置中心、信息流等等功能。

## 模版功能预览

### 首页

<div style="display: flex">
  <img width="375" alt="image" src="https://tdesign.gtimg.com/miniprogram/template/home-1.png">
  <img width="375" alt="image" src="https://tdesign.gtimg.com/miniprogram/template/home-2.png">
</div>

### 信息发布

<img width="375" alt="image" src="https://tdesign.gtimg.com/miniprogram/template/publish-1.png">

### 搜索页

<img width="375" alt="image" src="https://tdesign.gtimg.com/miniprogram/template/search-1.png">

### 个人中心
<div style="display: flex">
  <img width="375" alt="image" src="https://tdesign.gtimg.com/miniprogram/template/user-1.png">
  <img width="375" alt="image" src="https://tdesign.gtimg.com/miniprogram/template/user-2.png">
  <img width="375" alt="image" src="https://tdesign.gtimg.com/miniprogram/template/user-3.png">
</div>


### 设置中心

<img width="375" alt="image" src="https://tdesign.gtimg.com/miniprogram/template/setting-1.png">

### 消息中心

<img width="375" alt="image" src="https://tdesign.gtimg.com/miniprogram/template/message-1.png">


## 开发预览
### 目录结构（TODO: 生成目录结构树）


### 在开发者工具中预览

```bash
# 安装项目依赖
npm install

```

打开[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，导入整个项目，构建 npm 包，就可以预览示例了。

### 基础库版本

最低基础库版本`^2.6.5`


## 贡献成员

<a href="https://github.com/TDesignOteam/tdesign-miniprogram-starter/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=TDesignOteam/tdesign-miniprogram-starter" />
</a>

## 反馈

有任何问题，建议通过 [Github issues](https://github.com/TDesignOteam/tdesign-miniprogram-starter/issues) 反馈。

## 开源协议

TDesign 遵循 [MIT 协议](https://github.com/TDesignOteam/tdesign-miniprogram-starter/blob/main/LICENSE)。

## AI 穿搭助手（支持模型切换，本地测试版）

项目新增了一个 AI 对话页，当前改为**本地测试模式**：小程序前端直接请求第三方模型接口，不再依赖微信云函数。

### 当前支持的模型

- 智谱：`glm-4.7-flash`
- 硅基流动：`Qwen/Qwen3.5-4B`
- OpenRouter：`openrouter/free`

### 本地测试使用步骤

1. 打开 `config/ai.local.js`
2. 填入对应平台的 API Key
3. 在微信开发者工具里勾选：**不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书**
4. 重新编译后，进入小程序 `我的 -> AI 穿搭助手` 或 `消息页顶部入口` 使用

### 说明

- `config/ai.local.js` 已加入 `.gitignore`，避免误提交
- 这个版本只适合本地联调测试，不建议正式发布
- 如果某个平台模型名和你后台看到的不一致，请以平台控制台展示的实际模型 ID 为准

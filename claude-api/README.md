# Claude Writing Assistant API

基于 Express.js 和 Claude AI 的独立写作助手服务。

## 功能特性

- ✨ Claude AI 驱动的写作助手
- 🚀 流式响应（Server-Sent Events）
- 🛡️ TypeScript 类型安全
- 📝 完善的错误处理
- 📊 请求日志记录
- 🔒 CORS 配置

## 技术栈

- **框架**: Express.js
- **AI SDK**: @anthropic-ai/claude-agent-sdk v0.2.11
- **语言**: TypeScript
- **日志**: Winston

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

编辑 `.env` 文件，设置必要的配置：

```env
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
```

**重要**: 你需要从主项目的 `.env.server` 文件或其他安全来源获取 `ANTHROPIC_API_KEY`。

### 开发模式

```bash
pnpm dev
```

服务器将在 `http://localhost:3001` 启动。

### 生产构建

```bash
pnpm build
pnpm start
```

## API 文档

### POST /api/chat

发送消息给 Claude 写作助手，获取流式响应。

**请求示例**：

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "帮我优化这篇文章的开头"}'
```

**响应格式**：

Server-Sent Events (SSE) 流式响应

```
data: {"chunk":"这是"}

data: {"chunk":"Claude 的"}

data: {"chunk":"回复内容"}

data: [DONE]
```

### GET /health

健康检查端点。

**响应示例**：

```json
{
  "status": "ok",
  "timestamp": "2025-01-18T12:00:00.000Z"
}
```

## 项目结构

```
src/
├── index.ts              # 应用入口
├── routes/               # 路由
│   └── chat.ts          # 聊天接口
├── services/            # 服务层
│   └── claude-agent.service.ts
├── middleware/          # 中间件
│   ├── errorHandler.ts
│   ├── requestLogger.ts
│   └── cors.ts
├── types/              # 类型定义
│   └── index.ts
└── utils/              # 工具函数
    └── logger.ts
```

## 开发建议

1. 使用 TypeScript 进行类型检查
2. 遵循现有代码风格
3. 添加适当的错误处理
4. 记录关键操作日志
5. 定期更新依赖包

## 与主项目的集成

新后端启动后，前端项目可以：

1. 修改 API 基础 URL 指向新后端：`http://localhost:3001`
2. 调用 `/api/chat` 接口
3. 移除对旧 `/api/chat` 接口的依赖

**注意**: 新接口只接受 `{ message: string }` 请求体，不包含 `noteId` 字段。

## 许可证

MIT

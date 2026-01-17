# NewsNow 前后端分离部署指南

## 📋 目录结构

```
newsnow/
├── server/                 # 后端 API 服务
│   ├── api/               # API 路由
│   ├── services/          # 业务逻辑
│   └── ...
├── src/                   # 前端 React 应用
│   ├── components/        # React 组件
│   ├── app-views/         # 页面视图
│   └── ...
├── shared/                # 共享代码
├── scripts/               # 部署脚本
│   ├── dev-backend.sh     # 后端开发服务器
│   ├── dev-frontend.sh    # 前端开发服务器
│   └── deploy.sh          # 生产部署脚本
├── Dockerfile.backend     # 后端 Docker 配置
├── Dockerfile.frontend    # 前端 Docker 配置
├── docker-compose.yml     # Docker Compose 配置
└── nginx.conf            # Nginx 配置
```

## 🚀 本地开发部署

### 方式一：使用脚本（推荐）

**终端 1 - 启动后端服务器：**
```bash
cd /Users/scott/Documents/黑客松比赛/newsow
./scripts/dev-backend.sh
```

**终端 2 - 启动前端服务器：**
```bash
cd /Users/scott/Documents/黑客松比赛/newsow
./scripts/dev-frontend.sh
```

### 方式二：手动启动

**启动后端（端口 3001）：**
```bash
cd /Users/scott/Documents/黑客松比赛/newsow
NODE_ENV=development npx nitropack dev --dir server --port 3001
```

**启动前端（端口 5173）：**
```bash
cd /Users/scott/Documents/黑客松比赛/newsow
pnpm run dev
```

### 访问应用

- 前端：http://localhost:5173
- 后端 API：http://localhost:3001
- 聊天 API：http://localhost:3001/api/chat

## 🐳 Docker 生产部署

### 前置要求

- Docker
- Docker Compose

### 配置环境变量

创建 `.env` 文件（或使用现有的 `.env.server`）：

```bash
# CloudBase 配置
CLOUDBASE_ENV_ID=your_env_id
CLOUDBASE_API_KEY=your_api_key

# Anthropic Claude API（必需）
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 构建并启动服务

```bash
cd /Users/scott/Documents/黑客松比赛/newsow

# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重新构建
docker-compose up -d --build
```

### 访问应用

- 前端：http://localhost
- 后端：http://localhost:3001

## 📦 部署到云服务

### 后端部署选项

1. **Vercel Edge Functions**
2. **Cloudflare Workers**
3. **AWS Lambda + API Gateway**
4. **DigitalOcean App Platform**
5. **Railway**
6. **Heroku**

### 前端部署选项

1. **Vercel**
2. **Netlify**
3. **Cloudflare Pages**
4. **AWS S3 + CloudFront**
5. **GitHub Pages**

## 🔧 配置说明

### 后端配置

- 端口：3001（开发），可配置（生产）
- API 路由前缀：`/api`
- 流式响应：支持 SSE（Server-Sent Events）
- 会话管理：Claude Agent SDK 自动管理

### 前端配置

- 端口：5173（开发），80（生产）
- API 代理：通过 Vite proxy 配置（开发）
- API 转发：通过 Nginx 配置（生产）

## 🌐 API 端点

### 聊天 API

**端点：** `POST /api/chat`

**请求体：**
```json
{
  "noteId": "string",
  "message": "string"
}
```

**响应：** SSE 流式响应

```
data: {"chunk": "部分回复内容"}

data: [DONE]
```

## 📝 环境变量

### 必需变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `ANTHROPIC_API_KEY` | Claude API 密钥 | `sk-ant-api03-...` |

### 可选变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `CLOUDBASE_ENV_ID` | CloudBase 环境ID | - |
| `CLOUDBASE_API_KEY` | CloudBase API 密钥 | - |
| `NODE_ENV` | 运行环境 | `development` |

## 🔐 安全注意事项

1. **永远不要**将 `.env.server` 文件提交到版本控制
2. 使用 `.env.example` 或 `example.env.server` 作为模板
3. 在生产环境使用强密码和安全的 API Key
4. 启用 HTTPS（生产环境）
5. 配置 CORS 限制
6. 设置速率限制

## 🐛 故障排查

### 后端无法启动

1. 检查端口 3001 是否被占用：`lsof -ti:3001`
2. 检查环境变量是否正确配置
3. 查看日志：`docker-compose logs backend`

### 前端无法连接后端

1. 确认后端正在运行：`curl http://localhost:3001/api/health`
2. 检查代理配置（开发）或 Nginx 配置（生产）
3. 查看浏览器控制台的错误信息

### 聊天功能不工作

1. 确认 `ANTHROPIC_API_KEY` 已设置
2. 检查 API Key 是否有效
3. 查看后端日志的错误信息

## 📚 相关文档

- [Claude Agent SDK 文档](https://platform.claude.com/docs/zh-CN/agent-sdk/typescript-v2-preview)
- [Nitro 文档](https://nitro.unjs.io/)
- [Vite 文档](https://vitejs.dev/)
- [Docker 文档](https://docs.docker.com/)

## 🆘 获取帮助

如果遇到问题：

1. 检查日志文件
2. 查看错误信息
3. 参考故障排查部分
4. 联系开发团队

---

**最后更新：** 2026-01-17

# NewsNow 快速启动命令

## 🚀 快速开始

```bash
# 1. 首次使用：配置后端环境变量
cp claude-api/.env.example claude-api/.env
# 编辑 claude-api/.env，设置 ANTHROPIC_API_KEY

# 2. 安装依赖（首次）
pnpm install
cd claude-api && pnpm install && cd ..

# 3. 启动所有服务
pnpm dev:all
```

## 📋 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev:all` | 🚀 启动前端 + 后端 |
| `pnpm stop:all` | 🛑 停止所有服务 |
| `pnpm logs` | 📊 查看服务日志 |
| `pnpm dev` | 仅启动前端 |
| `Ctrl+C` | 停止所有服务 |

## 🌐 服务地址

- 🌍 **前端**: http://localhost:5173
- 🔧 **后端**: http://localhost:3001/api
- ❤️ **健康检查**: http://localhost:3001/health

## 💡 提示

- 日志文件位置：`logs/backend.log` 和 `logs/frontend.log`
- 查看实时日志：`tail -f logs/backend.log`
- 后端代码位置：`claude-api/`
- 需要帮助？查看 [STARTUP_GUIDE.md](./STARTUP_GUIDE.md)

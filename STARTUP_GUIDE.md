# NewsNow 全栈启动指南

本指南介绍如何同时启动 NewsNow 的前端和后端服务。

## 📋 前置要求

### 1. 配置后端环境变量

首先，确保后端服务的环境变量已正确配置：

```bash
# 复制环境变量模板
cp claude-api/.env.example claude-api/.env

# 编辑 .env 文件，设置 ANTHROPIC_API_KEY
nano claude-api/.env
```

**重要**: `ANTHROPIC_API_KEY` 是必需的，你需要从 Anthropic 官网获取。

### 2. 安装依赖

确保前端和后端的依赖都已安装：

```bash
# 安装前端依赖
pnpm install

# 安装后端依赖
cd claude-api
pnpm install
cd ..
```

## 🚀 启动方式

### 方式一：使用 npm 脚本（推荐）

```bash
# 同时启动前端和后端
pnpm dev:all
```

这将：
- ✅ 启动前端服务（端口 5173）
- ✅ 启动后端服务（端口 3001）
- ✅ 创建日志文件到 `logs/` 目录
- ✅ 显示所有服务的访问地址

### 方式二：直接运行脚本

```bash
./start-all.sh
```

## 🛑 停止服务

### 停止所有服务

```bash
# 使用 npm 脚本
pnpm stop:all

# 或直接运行脚本
./stop-all.sh
```

或者按 `Ctrl+C` 也可以停止所有服务。

## 📊 查看日志

### 使用日志查看脚本

```bash
# 使用 npm 脚本
pnpm logs

# 或直接运行脚本
./logs.sh
```

这将显示一个菜单，让你选择：
1. 查看后端日志
2. 查看前端日志
3. 查看全部日志

### 直接查看日志文件

```bash
# 查看后端日志
tail -f logs/backend.log

# 查看前端日志
tail -f logs/frontend.log
```

## 🌐 服务地址

启动成功后，你可以访问：

| 服务 | 地址 | 说明 |
|------|------|------|
| 前端 | http://localhost:5173 | NewsNow 主应用 |
| 后端 API | http://localhost:3001/api | Claude 写作助手 API |
| 健康检查 | http://localhost:3001/health | 后端健康检查端点 |

## 📝 可用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev:all` | 启动前端 + 后端 |
| `pnpm stop:all` | 停止所有服务 |
| `pnpm logs` | 查看服务日志 |
| `pnpm dev` | 仅启动前端 |
| `cd claude-api && pnpm dev` | 仅启动后端 |

## 🔧 故障排查

### 问题 1：端口已被占用

如果看到端口占用的错误：

```bash
# 查找占用端口的进程
lsof -i :5173  # 前端端口
lsof -i :3001  # 后端端口

# 杀死进程
kill -9 <PID>
```

### 问题 2：后端启动失败

1. 检查 `claude-api/.env` 文件是否存在
2. 确认 `ANTHROPIC_API_KEY` 已正确设置
3. 查看后端日志：`tail -f logs/backend.log`

### 问题 3：前端无法连接后端

1. 确认后端已启动：访问 http://localhost:3001/health
2. 检查前端 API 配置是否指向正确的后端地址
3. 查看浏览器控制台的网络请求

## 📂 项目结构

```
newsnow/
├── claude-api/          # 后端服务（Express + Claude API）
│   ├── src/
│   ├── dist/
│   ├── .env
│   └── package.json
├── logs/                # 日志目录
│   ├── backend.log      # 后端日志
│   ├── frontend.log     # 前端日志
│   ├── backend.pid      # 后端进程 ID
│   └── frontend.pid     # 前端进程 ID
├── src/                 # 前端源码
├── start-all.sh         # 全栈启动脚本
├── stop-all.sh          # 停止所有服务脚本
├── logs.sh              # 日志查看脚本
└── package.json         # 前端配置
```

## 🎯 开发工作流

### 典型的开发流程：

1. **启动服务**
   ```bash
   pnpm dev:all
   ```

2. **开发前端代码**
   - 前端热重载会自动更新

3. **开发后端代码**
   - 后端使用 `tsx watch`，也会自动重载
   - 或者重启后端：
     ```bash
     pnpm stop:all
     pnpm dev:all
     ```

4. **查看日志**
   ```bash
   pnpm logs
   ```

5. **完成开发**
   ```bash
   pnpm stop:all
   ```

## 💡 提示

- 日志文件会不断增长，定期清理：`rm -rf logs/*`
- 进程 PID 文件用于跟踪和停止服务
- 使用 `Ctrl+C` 可以优雅地停止所有服务
- 后端 API 文档：查看 [claude-api/README.md](claude-api/README.md)

## 🔗 相关文档

- [前端开发指南](./README.md)
- [后端 API 文档](./claude-api/README.md)
- [Claude API 使用指南](./claude-api/README.md)

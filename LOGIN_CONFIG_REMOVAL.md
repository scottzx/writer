# 登录功能配置移除说明

## 📝 修改摘要

已成功移除对以下三个环境变量的**强制要求**，应用现在可以在没有这些配置的情况下正常运行：

- ❌ ~~`JWT_SECRET`~~
- ❌ ~~`G_CLIENT_ID`~~
- ❌ ~~`G_CLIENT_SECRET`~~

## 🔧 修改的文件

### 1. [server/api/enable-login.ts](server/api/enable-login.ts)
**修改前**: 硬编码返回 `enable: true`
**修改后**: 动态检查登录配置，未配置时返回 `enable: false`

```typescript
export default defineEventHandler(async () => {
  const hasLoginConfig = process.env.G_CLIENT_ID && process.env.G_CLIENT_SECRET && process.env.JWT_SECRET

  return {
    enable: !!hasLoginConfig,
    url: hasLoginConfig
      ? `https://github.com/login/oauth/authorize?client_id=${process.env.G_CLIENT_ID}`
      : null,
  }
})
```

### 2. [server/middleware/auth.ts](server/middleware/auth.ts)
**修改前**: 缺少环境变量时抛出 506 错误
**修改后**: 未配置时标记为禁用，不影响其他功能

```typescript
// 检查是否配置了登录功能
const hasLoginConfig = ["JWT_SECRET", "G_CLIENT_ID", "G_CLIENT_SECRET"].every(k => process.env[k])

if (!hasLoginConfig) {
  // 未配置登录功能，标记为禁用
  event.context.disabledLogin = true
}
```

### 3. [example.env.server](example.env.server)
**修改前**: 环境变量列为必需（置顶）
**修改后**: 移到注释中，说明为可选配置

### 4. [vite.config.ts](vite.config.ts)
**修改前**: 代理目标为 `http://localhost:3001`
**修改后**: 修正为 `http://localhost:3000`

## ✅ 当前状态

### 服务运行情况
- ✅ 前端: `http://localhost:5173` (Vite)
- ✅ 后端: `http://localhost:3000` (Nitro)
- ✅ API 代理: `/api/*` → `http://localhost:3000/api/*`

### API 测试结果
```bash
# 测试登录状态 API
curl http://localhost:3000/api/enable-login

# 返回:
{
  "enable": false,  # 登录功能已禁用
  "url": null       # 没有 OAuth URL
}
```

### 环境变量状态
当前 `.env.server` 文件**不需要**包含以下配置即可运行：
- ~~G_CLIENT_ID~~
- ~~G_CLIENT_SECRET~~
- ~~JWT_SECRET~~

## 🎯 功能影响

### ✅ 正常工作的功能
- 新闻源加载（/api/s?id=xxx）
- 热门新闻查看
- 内容浏览
- 所有非登录相关的 API

### ❌ 不可用的功能
- 用户登录/注册
- 个人收藏（需要登录）
- 用户个性化设置

## 🚀 如何启动服务

### 方式 1: 使用重启脚本（推荐）
```bash
pnpm restart
```

### 方式 2: 手动启动
```bash
# 终端 1 - 启动后端
npm exec nitropack dev --dir server --port 3000

# 终端 2 - 启动前端
pnpm run dev
```

## 📋 （可选）如何启用登录功能

如果将来需要启用登录功能，只需在 `.env.server` 中添加：

```bash
# GitHub OAuth 配置
G_CLIENT_ID=your_github_client_id
G_CLIENT_SECRET=your_github_client_secret
JWT_SECRET=$(openssl rand -base64 32)
```

然后重启服务即可。

## 🔍 故障排查

### 问题: 前端无法访问后端 API
**检查**:
```bash
# 检查后端是否运行
lsof -i:3000

# 检查前端是否运行
lsof -i:5173

# 直接测试后端 API
curl http://localhost:3000/api/enable-login
```

### 问题: 端口被占用
**解决**:
```bash
# 查找占用进程
lsof -i:3000
lsof -i:5173

# 杀死进程
kill -9 <PID>

# 或使用重启脚本自动清理
pnpm restart
```

## 📚 相关文档

- [RESTART_GUIDE.md](./RESTART_GUIDE.md) - 重启脚本使用指南
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 部署指南
- [README.md](./README.md) - 项目说明

## 🎉 总结

现在 NewsNow 可以在**没有任何第三方 OAuth 配置**的情况下正常运行，用户可以：
- ✅ 浏览所有新闻源
- ✅ 查看热门内容
- ✅ 使用所有基础功能

只有需要用户账户系统时才需要配置 GitHub OAuth。

# NewsNow 重启脚本使用指南

本项目提供了两个便捷的重启脚本，用于开发环境和生产环境。

## 📦 脚本说明

### 1. 开发环境重启脚本 (`restart.sh`)

用于本地开发环境的快速重启，会停止所有运行中的开发服务器进程并重新启动。

**功能：**
- 自动停止 Vite 前端开发服务器
- 自动停止 Nitro 后端开发服务器
- 清理端口占用（5173 和 3001）
- 可选自动重启服务

**使用方法：**

```bash
# 方式 1：直接运行脚本
./restart.sh

# 方式 2：使用 npm/pnpm 命令
pnpm restart
# 或
npm run restart
```

**交互提示：**
- 脚本会询问是否立即启动开发服务器
- 输入 `Y` 或直接回车：自动启动
- 输入 `n`：跳过自动启动，稍后手动运行 `pnpm run dev`

### 2. Docker 生产环境重启脚本 (`restart-docker.sh`)

用于 Docker 容器部署的生产环境重启。

**功能：**
- 检查 Docker 和 Docker Compose 是否安装
- 重启所有 Docker 容器（前端和后端）
- 显示容器运行状态
- 提供访问地址和日志查看命令

**前提条件：**
- 已安装 Docker 和 Docker Compose
- 已配置 `docker-compose.yml`
- 已创建 `.env.server` 环境变量文件

**使用方法：**

```bash
# 方式 1：直接运行脚本
./restart-docker.sh

# 方式 2：使用 npm/pnpm 命令
pnpm restart:docker
# 或
npm run restart:docker
```

## 🚀 快速开始

### 开发环境

1. **首次启动开发服务器：**
   ```bash
   pnpm install
   pnpm run dev
   ```

2. **需要重启时：**
   ```bash
   pnpm restart
   ```

3. **访问地址：**
   - 前端：http://localhost:5173
   - 后端：http://localhost:3001

### 生产环境（Docker）

1. **首次启动 Docker 容器：**
   ```bash
   # 配置环境变量
   cp .env.production.example .env.server
   # 编辑 .env.server 填入实际的配置

   # 启动容器
   docker-compose up -d
   ```

2. **需要重启时：**
   ```bash
   pnpm restart:docker
   ```

3. **访问地址：**
   - 前端：http://localhost
   - 后端：http://localhost:3001

## 📋 常用命令

### 开发环境

```bash
# 启动开发服务器
pnpm run dev

# 重启开发服务器
pnpm restart

# 查看实时日志
pnpm run dev

# 停止服务（Ctrl+C 或手动 kill）
# 或使用重启脚本中的停止功能
```

### Docker 环境

```bash
# 启动容器
docker-compose up -d

# 重启容器
pnpm restart:docker

# 查看容器状态
docker-compose ps

# 查看实时日志
docker-compose logs -f

# 停止容器
docker-compose stop

# 停止并删除容器
docker-compose down
```

## 🔧 故障排查

### 开发环境

**问题：端口被占用**
```bash
# 查看端口占用
lsof -i:5173  # 前端端口
lsof -i:3001  # 后端端口

# 手动清理端口
lsof -ti:5173 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

**问题：进程无法停止**
```bash
# 查找所有相关进程
ps aux | grep -E "(vite|nitro)"

# 手动杀死进程
kill -9 <PID>
```

### Docker 环境

**问题：Docker 未安装**
- 请访问 [Docker 官网](https://www.docker.com/) 下载安装

**问题：容器无法启动**
```bash
# 查看容器日志
docker-compose logs backend
docker-compose logs frontend

# 检查环境变量配置
cat .env.server
```

**问题：端口冲突**
- 修改 `docker-compose.yml` 中的端口映射
- 例如：将 `'80:80'` 改为 `'8080:80'`

## 📝 注意事项

1. **开发环境脚本**会杀死所有匹配的进程，请确保没有其他重要项目在使用相同的进程名
2. **Docker 脚本**需要 Docker 已安装并正在运行
3. 重启前建议保存当前工作，避免数据丢失
4. 生产环境重启会导致短暂的服务中断，请在低峰期操作

## 🎯 脚本特性

- ✅ 彩色日志输出，清晰易读
- ✅ 错误处理和提示
- ✅ 自动检测环境
- ✅ 交互式确认
- ✅ 进程和端口清理
- ✅ 状态检查和显示

## 📚 相关文档

- [DEPLOYMENT.md](./DEPLOYMENT.md) - 部署指南
- [README.md](./README.md) - 项目说明

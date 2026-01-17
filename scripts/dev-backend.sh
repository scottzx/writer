#!/bin/bash
# 后端开发服务器启动脚本

cd /Users/scott/Documents/黑客松比赛/newsnow

echo "🚀 启动 Nitro 后端开发服务器..."
echo "📍 运行在: http://localhost:3001"
echo ""

# 加载环境变量
export $(cat .env.server | grep -v '^#' | xargs)

# 使用 nitropack 启动开发服务器
NODE_ENV=development npx nitropack dev --dir server --port 3001

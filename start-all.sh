#!/bin/bash

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  NewsNow 全栈启动脚本${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 检查是否有 .env 文件在 claude-api
if [ ! -f "claude-api/.env" ]; then
    echo -e "${YELLOW}警告: claude-api/.env 文件不存在${NC}"
    echo -e "${YELLOW}请先复制 claude-api/.env.example 到 claude-api/.env${NC}"
    echo -e "${YELLOW}并设置 ANTHROPIC_API_KEY${NC}"
    echo ""
    read -p "是否继续启动？(y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 创建日志目录
mkdir -p logs

echo -e "${GREEN}正在启动后端服务 (Claude API)...${NC}"
echo -e "${GREEN}后端地址: http://localhost:3001${NC}"
echo ""

echo -e "${GREEN}正在启动前端服务 (NewsNow)...${NC}"
echo -e "${GREEN}前端地址: http://localhost:5173${NC}"
echo ""

echo -e "${YELLOW}按 Ctrl+C 停止所有服务${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 启动后端
cd claude-api
pnpm dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "后端 PID: $BACKEND_PID"
cd ..

# 等待后端启动
sleep 2

# 启动前端
pnpm dev > logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "前端 PID: $FRONTEND_PID"

# 保存 PID 到文件
echo $BACKEND_PID > logs/backend.pid
echo $FRONTEND_PID > logs/frontend.pid

echo ""
echo -e "${GREEN}✓ 所有服务已启动！${NC}"
echo ""
echo -e "${BLUE}服务地址:${NC}"
echo -e "  前端: ${GREEN}http://localhost:5173${NC}"
echo -e "  后端: ${GREEN}http://localhost:3001${NC}"
echo -e "  健康检查: ${GREEN}http://localhost:3001/health${NC}"
echo ""
echo -e "${BLUE}日志文件:${NC}"
echo -e "  后端: logs/backend.log"
echo -e "  前端: logs/frontend.log"
echo ""
echo -e "${YELLOW}提示: 使用 'pnpm logs' 查看实时日志${NC}"
echo ""

# 捕获 Ctrl+C 信号
trap "echo -e '\n${YELLOW}正在停止所有服务...${NC}'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; rm -f logs/*.pid; echo -e '${GREEN}所有服务已停止${NC}'; exit 0" INT TERM

# 等待进程
wait

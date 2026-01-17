#!/bin/bash

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}正在停止所有服务...${NC}"

# 读取 PID 并停止
if [ -f "logs/backend.pid" ]; then
    BACKEND_PID=$(cat logs/backend.pid)
    kill $BACKEND_PID 2>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ 后端服务已停止 (PID: $BACKEND_PID)${NC}"
    else
        echo -e "${RED}✗ 后端服务停止失败 (PID: $BACKEND_PID)${NC}"
    fi
    rm -f logs/backend.pid
fi

if [ -f "logs/frontend.pid" ]; then
    FRONTEND_PID=$(cat logs/frontend.pid)
    kill $FRONTEND_PID 2>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ 前端服务已停止 (PID: $FRONTEND_PID)${NC}"
    else
        echo -e "${RED}✗ 前端服务停止失败 (PID: $FRONTEND_PID)${NC}"
    fi
    rm -f logs/frontend.pid
fi

# 清理可能残留的进程
pkill -f "claude-api" 2>/dev/null
pkill -f "vite" 2>/dev/null

echo -e "${GREEN}所有服务已停止${NC}"

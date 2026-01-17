#!/bin/bash

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  NewsNow 日志查看${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}选择要查看的日志:${NC}"
echo -e "  1) 后端日志"
echo -e "  2) 前端日志"
echo -e "  3) 全部日志（后端 + 前端）"
echo -e "  4) 退出"
echo ""
read -p "请选择 (1-4): " choice

case $choice in
    1)
        echo -e "${GREEN}正在查看后端日志...${NC}"
        echo -e "${YELLOW}按 Ctrl+C 退出${NC}"
        echo ""
        tail -f logs/backend.log
        ;;
    2)
        echo -e "${GREEN}正在查看前端日志...${NC}"
        echo -e "${YELLOW}按 Ctrl+C 退出${NC}"
        echo ""
        tail -f logs/frontend.log
        ;;
    3)
        echo -e "${GREEN}正在查看全部日志...${NC}"
        echo -e "${YELLOW}按 Ctrl+C 退出${NC}"
        echo ""
        echo -e "${BLUE}======== 后端日志 ========${NC}"
        tail -f logs/backend.log logs/frontend.log
        ;;
    4)
        exit 0
        ;;
    *)
        echo -e "${RED}无效选择${NC}"
        exit 1
        ;;
esac

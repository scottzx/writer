#!/bin/bash

# NewsNow 前后端重启脚本
# 用于开发环境的快速重启

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 查找并杀死进程
kill_process() {
    local process_name=$1
    local pids=$(pgrep -f "$process_name" || true)

    if [ -n "$pids" ]; then
        log_info "正在停止 $process_name 进程..."
        echo "$pids" | xargs kill -9 2>/dev/null || true
        sleep 1
        log_success "$process_name 已停止"
    else
        log_warning "未发现运行中的 $process_name 进程"
    fi
}

# 主函数
main() {
    echo ""
    log_info "=========================================="
    log_info "NewsNow 前后端重启脚本"
    log_info "=========================================="
    echo ""

    # 检查是否在项目根目录
    if [ ! -f "package.json" ]; then
        log_error "请在项目根目录运行此脚本"
        exit 1
    fi

    # 停止后端服务
    log_info "停止后端服务..."
    kill_process "nitropack dev --dir server"
    kill_process "nitropack"

    # 停止前端服务
    log_info "停止前端服务..."
    kill_process "vite dev"
    kill_process "vite"

    # 清理可能残留的端口占用
    log_info "检查端口占用..."
    lsof -ti:5173 | xargs kill -9 2>/dev/null || true  # Vite 默认端口
    lsof -ti:3001 | xargs kill -9 2>/dev/null || true  # 后端端口

    echo ""
    log_success "所有服务已停止"
    echo ""

    # 询问是否立即重启
    read -p "$(echo -e ${YELLOW}是否立即启动开发服务器? [Y/n]${NC} )" -n 1 -r
    echo

    if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
        log_info "正在启动开发服务器..."

        # 使用 pnpm 启动开发服务器（后台运行）
        pnpm run dev > /dev/null 2>&1 &

        log_success "开发服务器正在启动中..."
        log_info "前端地址: http://localhost:5173"
        log_info "后端地址: http://localhost:3001"
        log_info ""
        log_info "使用 'pnpm run dev' 查看实时日志"
    else
        log_info "已跳过自动启动，请手动运行 'pnpm run dev' 启动服务"
    fi

    echo ""
    log_success "重启完成！"
}

# 运行主函数
main

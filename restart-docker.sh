#!/bin/bash

# NewsNow Docker 前后端重启脚本
# 用于生产环境的 Docker 容器重启

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

# 检查 Docker 是否安装
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker 未安装，请先安装 Docker"
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        log_error "Docker Compose 未安装，请先安装 Docker Compose"
        exit 1
    fi
}

# 主函数
main() {
    echo ""
    log_info "=========================================="
    log_info "NewsNow Docker 重启脚本"
    log_info "=========================================="
    echo ""

    # 检查是否在项目根目录
    if [ ! -f "package.json" ]; then
        log_error "请在项目根目录运行此脚本"
        exit 1
    fi

    # 检查 Docker
    check_docker

    # 检查 docker-compose.yml 文件
    if [ ! -f "docker-compose.yml" ]; then
        log_error "未找到 docker-compose.yml 文件"
        exit 1
    fi

    # 检查环境变量文件
    if [ ! -f ".env.server" ]; then
        log_error "未找到 .env.server 文件"
        log_info "请先创建环境变量文件"
        exit 1
    fi

    log_info "正在重启 Docker 容器..."
    echo ""

    # 使用 docker-compose 重启容器
    if docker-compose version &> /dev/null; then
        docker-compose restart
    else
        docker compose restart
    fi

    echo ""
    log_success "Docker 容器已重启"
    echo ""

    # 显示容器状态
    log_info "容器状态："
    echo ""

    if docker-compose version &> /dev/null; then
        docker-compose ps
    else
        docker compose ps
    fi

    echo ""
    log_success "重启完成！"
    echo ""
    log_info "前端访问地址: http://localhost"
    log_info "后端访问地址: http://localhost:3001"
    echo ""
    log_info "使用 'docker-compose logs -f' 查看实时日志"
    log_info "使用 'docker-compose stop' 停止服务"
}

# 运行主函数
main

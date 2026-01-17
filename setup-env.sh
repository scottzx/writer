#!/bin/bash

# NewsNow 环境配置助手
# 用于检查和配置必需的环境变量

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
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

log_step() {
    echo -e "${CYAN}[STEP]${NC} $1"
}

# 检查环境变量是否存在且非空
check_env_var() {
    local var_name=$1
    local var_value=$(grep "^${var_name}=" .env.server 2>/dev/null | cut -d'=' -f2-)

    if [ -z "$var_value" ]; then
        log_warning "❌ $var_name 未配置"
        return 1
    else
        log_success "✅ $var_name 已配置"
        return 0
    fi
}

# 显示配置帮助
show_config_help() {
    echo ""
    log_info "=========================================="
    log_info "环境变量配置说明"
    log_info "=========================================="
    echo ""
    log_step "必需的配置项："
    echo ""
    echo "1. JWT_SECRET"
    echo "   用途: JWT 令牌签名密钥"
    echo "   生成方法: openssl rand -base64 32"
    echo ""
    echo "2. G_CLIENT_ID"
    echo "   用途: GitHub OAuth 登录（可选）"
    echo "   获取方式: https://github.com/settings/developers"
    echo ""
    echo "3. G_CLIENT_SECRET"
    echo "   用途: GitHub OAuth 登录（可选）"
    echo "   获取方式: 同上"
    echo ""
    echo "4. ANTHROPIC_API_KEY"
    echo "   用途: Claude AI 功能（可选）"
    echo "   获取方式: https://console.anthropic.com/"
    echo ""
    log_step "可选配置项："
    echo ""
    echo "- PRODUCTHUNT_API_TOKEN: Product Hunt API（可选）"
    echo "- ENABLE_CACHE: 启用缓存（默认: true）"
    echo "- INIT_TABLE: 初始化数据库表（默认: true）"
    echo ""
}

# 主函数
main() {
    echo ""
    log_info "=========================================="
    log_info "NewsNow 环境配置检查"
    log_info "=========================================="
    echo ""

    # 检查是否在项目根目录
    if [ ! -f "package.json" ]; then
        log_error "请在项目根目录运行此脚本"
        exit 1
    fi

    # 检查 .env.server 文件
    if [ ! -f ".env.server" ]; then
        log_warning ".env.server 文件不存在"
        log_info "正在创建 .env.server 文件..."

        if [ -f "example.env.server" ]; then
            cp example.env.server .env.server
            log_success ".env.server 文件已创建"
        else
            log_error "未找到 example.env.server 模板文件"
            exit 1
        fi
    fi

    echo ""
    log_step "检查环境变量配置..."
    echo ""

    # 必需的环境变量
    local has_errors=0

    # 检查登录相关配置（如果启用登录则是必需的）
    if ! check_env_var "JWT_SECRET"; then
        ((has_errors++))
    fi

    if ! check_env_var "G_CLIENT_ID"; then
        ((has_errors++))
    fi

    if ! check_env_var "G_CLIENT_SECRET"; then
        ((has_errors++))
    fi

    # 检查 AI 功能配置
    if ! check_env_var "ANTHROPIC_API_KEY"; then
        log_warning "ANTHROPIC_API_KEY 未配置（AI 功能将不可用）"
    fi

    echo ""

    if [ $has_errors -gt 0 ]; then
        log_warning "发现 $has_errors 个配置项缺失"
        echo ""
        show_config_help

        # 询问是否自动生成 JWT_SECRET
        echo ""
        read -p "$(echo -e ${YELLOW}是否自动生成 JWT_SECRET? [Y/n]${NC} )" -n 1 -r
        echo

        if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
            if command -v openssl &> /dev/null; then
                JWT_SECRET=$(openssl rand -base64 32)
                echo ""
                log_info "生成的 JWT_SECRET: $JWT_SECRET"

                # 更新 .env.server
                if grep -q "^JWT_SECRET=" .env.server; then
                    sed -i.bak "s/^JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env.server
                    rm -f .env.server.bak
                else
                    echo "JWT_SECRET=$JWT_SECRET" >> .env.server
                fi
                log_success "JWT_SECRET 已添加到 .env.server"
            else
                log_warning "openssl 未安装，无法自动生成"
            fi
        fi

        echo ""
        log_warning "请手动配置其他必需的环境变量"
        log_info "编辑文件: .env.server"
        echo ""

        # 尝试打开编辑器
        if [ -n "$EDITOR" ]; then
            read -p "$(echo -e ${YELLOW}是否打开编辑器配置? [Y/n]${NC} )" -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
                $EDITOR .env.server
            fi
        else
            log_info "提示: 可以使用 code .env.server 或 vim .env.server 编辑"
        fi

        echo ""
        log_warning "配置完成后，请重启开发服务器"
        log_info "运行: pnpm restart"
        exit 1
    else
        log_success "所有必需的环境变量已配置！"
        echo ""

        # 询问是否重启服务
        read -p "$(echo -e ${YELLOW}是否立即重启开发服务器? [Y/n]${NC} )" -n 1 -r
        echo

        if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
            log_info "正在重启开发服务器..."
            ./restart.sh
        else
            log_info "稍后可以运行 'pnpm restart' 重启服务"
        fi
    fi

    echo ""
    log_success "完成！"
}

# 运行主函数
main

# 快速开始

欢迎使用 Auto-UPnP！本指南将帮助您快速安装和配置 Auto-UPnP。

## 系统要求

### 最低要求
- **操作系统**：Linux (x86_64, ARM64), macOS, Windows
- **内存**：64MB RAM
- **存储**：10MB 可用空间
- **网络**：支持 UPnP 的路由器
- **权限**：需要网络访问权限

### 推荐配置
- **操作系统**：Ubuntu 20.04+, CentOS 8+, OpenWrt 21.02+
- **内存**：128MB RAM
- **存储**：50MB 可用空间
- **网络**：千兆网络环境
- **Go版本**：1.21 或更高版本（开发环境）

## 安装方式

### 方式一：一键安装脚本（推荐）

#### 自动安装
```bash
# 下载并执行安装脚本
curl -fsSL https://raw.githubusercontent.com/javen-yan/auto-upnp/master/install.sh | sudo bash

# 或者使用 wget
wget -qO- https://raw.githubusercontent.com/javen-yan/auto-upnp/master/install.sh | sudo bash
```

#### 分步安装
```bash
# 1. 下载安装脚本
wget https://raw.githubusercontent.com/javen-yan/auto-upnp/master/install.sh

# 2. 设置执行权限
chmod +x install.sh

# 3. 执行安装
sudo ./install.sh
```

安装脚本会自动完成：
- 下载最新 release 版本
- 生成默认配置文件到 `/etc/auto-upnp/config.yaml`
- 创建 systemd 服务文件
- 设置日志目录和权限
- 创建数据目录

### 方式二：手动安装

#### 1. 下载最新版本
```bash
# 获取最新版本号
VERSION=$(curl -s https://api.github.com/repos/javen-yan/auto-upnp/releases/latest | grep '"tag_name":' | cut -d'"' -f4)

# 检测系统架构
ARCH=$(uname -m)
case $ARCH in
    x86_64) ARCH="amd64" ;;
    aarch64|arm64) ARCH="arm64" ;;
    *) echo "不支持的架构: $ARCH"; exit 1 ;;
esac

# 下载对应平台的二进制文件
wget https://github.com/javen-yan/auto-upnp/releases/download/${VERSION}/auto-upnp-${OS}-${ARCH}
```

#### 2. 解压并安装
```bash
# 解压文件
tar -xzf auto-upnp-${VERSION}-linux-amd64.tar.gz

# 移动到系统目录
sudo mv auto-upnp /usr/local/bin/

# 设置执行权限
sudo chmod +x /usr/local/bin/auto-upnp
```

#### 3. 创建配置文件
```bash
# 创建配置目录
sudo mkdir -p /etc/auto-upnp

# 创建配置文件
sudo tee /etc/auto-upnp/config.yaml > /dev/null <<EOF
# 自动UPnP服务配置文件

# 端口监听范围配置
port_range:
  start: 18000      # 起始端口
  end: 19000        # 结束端口
  step: 1          # 端口间隔

# UPnP配置
upnp:
  discovery_timeout: 10s    # 设备发现超时时间
  mapping_duration: 1h      # 端口映射持续时间，0表示永久
  retry_attempts: 3         # 重试次数
  retry_delay: 5s           # 重试延迟

# 网络接口配置
network:
  preferred_interfaces: ["eth0", "wlan0"]  # 优先使用的网络接口
  exclude_interfaces: ["lo", "docker"]     # 排除的网络接口

# 日志配置
log:
  level: "info"
  format: "json"
  file: "/var/log/auto-upnp.log"
  max_size: 10485760  # 10MB
  backup_count: 5

# 监控配置
monitor:
  check_interval: 30s       # 端口状态检查间隔
  cleanup_interval: 5m      # 清理无效映射间隔
  max_mappings: 100         # 最大端口映射数量

# 管理服务配置
admin:
  enabled: true             # 是否启用管理服务
  host: "0.0.0.0"          # 监听地址
  username: "admin"         # 用户名
  password: "admin"         # 密码
  data_dir: "/var/lib/auto-upnp"  # 数据目录
EOF
```

### 方式三：从源码编译

#### 1. 克隆项目
```bash
git clone https://github.com/javen-yan/auto-upnp.git
cd auto-upnp
```

#### 2. 安装依赖
```bash
# 安装 Go 依赖
go mod tidy

# 安装构建工具
go install github.com/goreleaser/goreleaser@latest
```

#### 3. 构建项目
```bash
# 普通构建
make build

# 静态构建（解决 GLIBC 版本问题）
make build-static

# 构建所有平台版本
make build-all
```

#### 4. 安装到系统
```bash
# 复制二进制文件
sudo cp build/auto-upnp-static /usr/local/bin/auto-upnp

# 复制配置文件
sudo cp config.yaml /etc/auto-upnp/config.yaml
```

## 启动服务

### 使用 systemd 服务（推荐）

#### 1. 创建服务文件
```bash
sudo tee /etc/systemd/system/auto-upnp.service > /dev/null <<EOF
[Unit]
Description=Auto-UPnP Service
Documentation=https://github.com/javen-yan/auto-upnp
After=network.target
Wants=network.target

[Service]
Type=simple
User=root
Group=root
ExecStart=/usr/local/bin/auto-upnp -config /etc/auto-upnp/config.yaml
ExecReload=/bin/kill -HUP \$MAINPID
Restart=always
RestartSec=10
StandardOutput=null
StandardError=null
SyslogIdentifier=auto-upnp

# 安全设置
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/etc/auto-upnp /var/log /var/lib/auto-upnp

[Install]
WantedBy=multi-user.target
EOF
```

#### 2. 启动服务
```bash
# 重新加载 systemd
sudo systemctl daemon-reload

# 启用服务
sudo systemctl enable auto-upnp

# 启动服务
sudo systemctl start auto-upnp

# 查看服务状态
sudo systemctl status auto-upnp
```

### 直接运行
```bash
# 启动服务
sudo auto-upnp -config /etc/auto-upnp/config.yaml

# 后台运行
sudo nohup auto-upnp -config /etc/auto-upnp/config.yaml > /var/log/auto-upnp.log 2>&1 &

# 调试模式
sudo auto-upnp -config /etc/auto-upnp/config.yaml -log-level debug
```

## 验证安装

### 检查服务状态
```bash
# 检查进程
ps aux | grep auto-upnp

# 检查端口
netstat -tlnp | grep 8080

# 检查日志
tail -f /var/log/auto-upnp.log

# 检查服务状态
sudo systemctl status auto-upnp
```

### 访问 Web 界面
打开浏览器访问：`http://your-server-ip:8080`

如果一切正常，您应该能看到 Auto-UPnP 的管理界面。

### 测试 API 接口
```bash
# 获取服务状态
curl -u admin:admin http://localhost:8080/api/status

# 获取端口映射列表
curl -u admin:admin http://localhost:8080/api/mappings

# 获取端口状态
curl -u admin:admin http://localhost:8080/api/ports
```

## 配置说明

### 基本配置项

#### 端口范围配置
```yaml
port_range:
  start: 18000      # 起始端口
  end: 19000        # 结束端口
  step: 1           # 端口间隔
```

#### UPnP 配置
```yaml
upnp:
  discovery_timeout: 10s    # 设备发现超时时间
  mapping_duration: 1h      # 端口映射持续时间，0表示永久
  retry_attempts: 3         # 重试次数
  retry_delay: 5s           # 重试延迟
```

#### 管理服务配置
```yaml
admin:
  enabled: true             # 是否启用管理服务
  host: "0.0.0.0"          # 监听地址
  username: "admin"         # 用户名
  password: "admin"         # 密码
  data_dir: "/var/lib/auto-upnp"  # 数据目录
```

#### 日志配置
```yaml
log:
  level: "info"             # 日志级别: debug, info, warn, error
  format: "json"            # 日志格式: json, text
  file: "/var/log/auto-upnp.log"  # 日志文件
  max_size: 10485760        # 最大文件大小 (10MB)
  backup_count: 5           # 备份文件数量
```

#### 监控配置
```yaml
monitor:
  check_interval: 30s       # 端口状态检查间隔
  cleanup_interval: 5m      # 清理无效映射间隔
  max_mappings: 100         # 最大端口映射数量
```

### 高级配置

#### 网络接口配置
```yaml
network:
  preferred_interfaces: ["eth0", "wlan0"]  # 优先使用的网络接口
  exclude_interfaces: ["lo", "docker"]     # 排除的网络接口
```

#### 安全配置
```yaml
admin:
  enable_auth: true         # 启用认证
  allowed_ips: ["192.168.1.0/24"]  # 允许访问的IP范围
  ssl_cert: "/path/to/cert.pem"    # SSL证书路径
  ssl_key: "/path/to/key.pem"      # SSL私钥路径
```

详细的配置说明请参考 [配置说明](/usage/configuration) 页面。

## 服务管理

### 基本命令
```bash
# 启动服务
sudo systemctl start auto-upnp

# 停止服务
sudo systemctl stop auto-upnp

# 重启服务
sudo systemctl restart auto-upnp

# 查看服务状态
sudo systemctl status auto-upnp

# 查看实时日志
sudo journalctl -u auto-upnp -f

# 查看文件日志
tail -f /var/log/auto-upnp.log

# 开机自启动
sudo systemctl enable auto-upnp

# 禁用开机自启动
sudo systemctl disable auto-upnp
```

### 调试命令
```bash
# 测试配置
auto-upnp -config /etc/auto-upnp/config.yaml -test

# 调试模式运行
auto-upnp -config /etc/auto-upnp/config.yaml -log-level debug

# 显示帮助信息
auto-upnp -help

# 显示版本信息
auto-upnp -version
```

## 故障排除

如果安装过程中遇到问题，请查看 [故障排除](/usage/troubleshooting) 页面获取帮助。

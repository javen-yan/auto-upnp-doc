# 配置说明

Auto-UPnP 使用 YAML 格式的配置文件，支持丰富的配置选项来满足不同的使用场景。

## 配置文件位置

默认配置文件位置：`/etc/auto-upnp/config.yaml`

## 配置结构

```yaml
# 自动UPnP服务配置文件

# 端口监听范围配置
port_range:
  start: 18000      # 起始端口
  end: 19000        # 结束端口
  step: 1           # 端口间隔

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
  level: "info"             # 日志级别
  format: "json"            # 日志格式
  file: "/var/log/auto-upnp.log"  # 日志文件
  max_size: 10485760        # 最大文件大小 (10MB)
  backup_count: 5           # 备份文件数量

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
```

## 详细配置说明

### 端口范围配置 (port_range)

控制要监控的端口范围。

```yaml
port_range:
  start: 18000      # 起始端口 (必需)
  end: 19000        # 结束端口 (必需)
  step: 1           # 端口间隔 (可选，默认: 1)
```

**参数说明：**
- `start`: 监控的起始端口号 (1-65535)
- `end`: 监控的结束端口号 (1-65535)
- `step`: 端口间隔，用于跳过某些端口 (1-65535)

**示例：**
```yaml
# 监控端口 8080-8090
port_range:
  start: 8080
  end: 8090
  step: 1

# 监控端口 10000-20000，间隔为 100
port_range:
  start: 10000
  end: 20000
  step: 100
```

### UPnP 配置 (upnp)

控制 UPnP 设备发现和端口映射的行为。

```yaml
upnp:
  discovery_timeout: 10s    # 设备发现超时时间
  mapping_duration: 1h      # 端口映射持续时间
  retry_attempts: 3         # 重试次数
  retry_delay: 5s           # 重试延迟
```

**参数说明：**
- `discovery_timeout`: UPnP 设备发现超时时间 (默认: 10s)
- `mapping_duration`: 端口映射持续时间，0 表示永久 (默认: 1h)
- `retry_attempts`: 操作失败时的重试次数 (默认: 3)
- `retry_delay`: 重试间隔时间 (默认: 5s)

**示例：**
```yaml
# 永久映射，快速发现
upnp:
  discovery_timeout: 5s
  mapping_duration: 0       # 永久映射
  retry_attempts: 5
  retry_delay: 2s

# 临时映射，慢速发现
upnp:
  discovery_timeout: 30s
  mapping_duration: 30m     # 30分钟
  retry_attempts: 2
  retry_delay: 10s
```

### 网络接口配置 (network)

控制网络接口的选择和使用。

```yaml
network:
  preferred_interfaces: ["eth0", "wlan0"]  # 优先使用的网络接口
  exclude_interfaces: ["lo", "docker"]     # 排除的网络接口
```

**参数说明：**
- `preferred_interfaces`: 优先使用的网络接口列表
- `exclude_interfaces`: 排除的网络接口列表

**示例：**
```yaml
# 只使用有线网络
network:
  preferred_interfaces: ["eth0", "enp0s3"]
  exclude_interfaces: ["lo", "docker", "veth*"]

# 使用所有接口
network:
  preferred_interfaces: []
  exclude_interfaces: ["lo"]
```

### 日志配置 (log)

控制日志记录的行为和格式。

```yaml
log:
  level: "info"             # 日志级别
  format: "json"            # 日志格式
  file: "/var/log/auto-upnp.log"  # 日志文件
  max_size: 10485760        # 最大文件大小 (10MB)
  backup_count: 5           # 备份文件数量
```

**参数说明：**
- `level`: 日志级别 (debug, info, warn, error)
- `format`: 日志格式 (json, text)
- `file`: 日志文件路径
- `max_size`: 单个日志文件最大大小 (字节)
- `backup_count`: 保留的备份文件数量

**示例：**
```yaml
# 详细调试日志
log:
  level: "debug"
  format: "text"
  file: "/var/log/auto-upnp.log"
  max_size: 52428800        # 50MB
  backup_count: 10

# 简洁生产日志
log:
  level: "warn"
  format: "json"
  file: "/var/log/auto-upnp.log"
  max_size: 10485760        # 10MB
  backup_count: 3
```

### 监控配置 (monitor)

控制端口监控和清理的行为。

```yaml
monitor:
  check_interval: 30s       # 端口状态检查间隔
  cleanup_interval: 5m      # 清理无效映射间隔
  max_mappings: 100         # 最大端口映射数量
```

**参数说明：**
- `check_interval`: 端口状态检查间隔 (默认: 30s)
- `cleanup_interval`: 清理无效映射间隔 (默认: 5m)
- `max_mappings`: 最大端口映射数量 (默认: 100)

**示例：**
```yaml
# 快速响应配置
monitor:
  check_interval: 10s       # 10秒检查一次
  cleanup_interval: 2m      # 2分钟清理一次
  max_mappings: 50          # 最多50个映射

# 节省资源配置
monitor:
  check_interval: 60s       # 1分钟检查一次
  cleanup_interval: 10m     # 10分钟清理一次
  max_mappings: 200         # 最多200个映射
```

### 管理服务配置 (admin)

控制 Web 管理界面的行为。

```yaml
admin:
  enabled: true             # 是否启用管理服务
  host: "0.0.0.0"          # 监听地址
  username: "admin"         # 用户名
  password: "admin"         # 密码
  data_dir: "/var/lib/auto-upnp"  # 数据目录
```

**参数说明：**
- `enabled`: 是否启用 Web 管理服务 (默认: true)
- `host`: 监听地址 (默认: "0.0.0.0")
- `username`: 登录用户名 (默认: "admin")
- `password`: 登录密码 (默认: "admin")
- `data_dir`: 数据存储目录 (默认: "data")

**示例：**
```yaml
# 基本配置
admin:
  enabled: true
  host: "0.0.0.0"
  username: "admin"
  password: "your-secure-password"
  data_dir: "/var/lib/auto-upnp"

# 禁用管理界面
admin:
  enabled: false

# 只允许本地访问
admin:
  enabled: true
  host: "127.0.0.1"
  username: "admin"
  password: "admin"
  data_dir: "/var/lib/auto-upnp"
```

## 高级配置选项

### 安全配置

```yaml
admin:
  enabled: true
  host: "0.0.0.0"
  username: "admin"
  password: "admin"
  data_dir: "/var/lib/auto-upnp"
```

### 性能优化配置

```yaml
# 高性能配置
monitor:
  check_interval: 10s       # 快速检查
  cleanup_interval: 2m      # 快速清理
  max_mappings: 50          # 限制映射数量

upnp:
  discovery_timeout: 5s     # 快速发现
  retry_attempts: 2         # 减少重试
  retry_delay: 2s           # 快速重试

log:
  level: "warn"             # 减少日志输出
  max_size: 5242880         # 5MB日志文件
  backup_count: 3           # 减少备份文件
```

### 开发调试配置

```yaml
# 调试配置
log:
  level: "debug"            # 详细日志
  format: "text"            # 可读格式
  file: "auto-upnp.log"     # 本地文件

monitor:
  check_interval: 5s        # 快速检查
  cleanup_interval: 1m      # 快速清理

upnp:
  discovery_timeout: 30s    # 长超时时间
  retry_attempts: 5         # 多次重试
  retry_delay: 10s          # 长重试间隔
```

## 配置验证

### 验证配置文件语法

```bash
# 验证配置文件
auto-upnp -config config.yaml -test

# 或者使用 yamllint
yamllint config.yaml
```

### 配置文件检查清单

- [ ] 端口范围设置合理 (start < end)
- [ ] 端口号在有效范围内 (1-65535)
- [ ] 时间格式正确 (如: 30s, 5m, 1h)
- [ ] 文件路径存在且有权限
- [ ] 网络接口名称正确
- [ ] 密码强度足够

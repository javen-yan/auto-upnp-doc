# 基本使用

欢迎使用 Auto-UPnP！本指南将帮助您了解如何使用 Auto-UPnP 的基本功能。

## 启动服务

### 命令行启动

```bash
# 使用默认配置启动
auto-upnp

# 使用指定配置文件启动
auto-upnp -config /etc/auto-upnp/config.yaml

# 指定日志级别启动
auto-upnp -log-level debug
```

### 服务管理

```bash
# 启动服务
sudo systemctl start auto-upnp

# 停止服务
sudo systemctl stop auto-upnp

# 重启服务
sudo systemctl restart auto-upnp

# 查看服务状态
sudo systemctl status auto-upnp

# 查看服务日志
sudo journalctl -u auto-upnp -f
```

## 访问 Web 管理界面

启动服务后，打开浏览器访问：`http://your-server-ip:8080`

### 界面概览

Web 管理界面包含以下主要区域：

- **顶部导航栏**：服务状态、设置、帮助
- **左侧边栏**：功能菜单
- **主内容区**：数据显示和操作界面

## 端口监控配置

### 添加监控端口

1. 在 Web 界面中点击"端口监控"
2. 点击"添加端口范围"
3. 填写端口范围信息：
   - 起始端口
   - 结束端口
   - 协议类型（TCP/UDP）
   - 描述信息
4. 点击"保存"

### 配置示例

```yaml
monitor:
  port_ranges:
    - start: 8080
      end: 8090
      protocol: "TCP"
      description: "Web服务端口"
    - start: 9000
      end: 9010
      protocol: "UDP"
      description: "游戏服务端口"
  check_interval: 30s
  cleanup_interval: 5m
```

## 手动端口映射

### 添加手动映射

1. 在 Web 界面中点击"端口映射"
2. 点击"添加映射"
3. 填写映射信息：
   - 内部端口
   - 外部端口
   - 协议类型
   - 描述信息
4. 点击"保存"

### 映射管理

- **查看映射**：显示所有当前端口映射
- **编辑映射**：修改现有映射配置
- **删除映射**：移除不需要的映射
- **批量操作**：支持批量删除映射

## 端口状态监控

### 实时状态

Web 界面实时显示：

- **端口状态**：活跃/非活跃
- **映射状态**：已映射/未映射
- **连接信息**：当前连接数
- **响应时间**：端口响应延迟

### 状态筛选

- 按协议筛选（TCP/UDP）
- 按状态筛选（活跃/非活跃）
- 按映射状态筛选
- 按端口范围筛选

## 日志查看

### 查看日志

1. 在 Web 界面中点击"日志"
2. 选择日志级别：
   - Debug：详细调试信息
   - Info：一般信息
   - Warn：警告信息
   - Error：错误信息

### 日志内容

日志包含以下信息：

- **时间戳**：事件发生时间
- **日志级别**：信息重要程度
- **组件**：产生日志的组件
- **消息**：具体事件描述


## 常见操作

### 重启服务

```bash
# 方法1：使用 systemctl
sudo systemctl restart auto-upnp

# 方法2：使用进程管理
pkill auto-upnp
auto-upnp -config /etc/auto-upnp/config.yaml
```

### 查看状态

```bash
# 查看进程状态
ps aux | grep auto-upnp

# 查看端口监听
netstat -tlnp | grep auto-upnp

# 查看日志
tail -f /var/log/auto-upnp.log
```

### 更新配置

1. 修改配置文件
2. 重启服务使配置生效
3. 检查服务状态
4. 验证配置是否正确

## 下一步

- 查看 [配置说明](/usage/configuration) 了解详细配置选项
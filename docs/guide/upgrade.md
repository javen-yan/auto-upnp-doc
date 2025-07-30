# 卸载

Auto-UPnP 支持脚本升级服务


## 卸载方式

### 方式一：一键升级脚本（推荐）

#### 自动安装
```bash
# 下载并执行安装脚本
curl -fsSL https://raw.githubusercontent.com/javen-yan/auto-upnp/master/install.sh | sudo bash -s -- --upgrade -y

# 或者使用 wget
wget -qO- https://raw.githubusercontent.com/javen-yan/auto-upnp/master/install.sh | sudo bash -s -- --upgrade -y
```

#### 分步安装
```bash
# 1. 下载安装脚本
wget https://raw.githubusercontent.com/javen-yan/auto-upnp/master/install.sh

# 2. 设置执行权限
chmod +x install.sh

# 3. 执行安装
sudo ./install.sh --upgrade -y
```



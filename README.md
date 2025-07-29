# Auto-UPnP Web

Auto-UPnP 项目的官方文档网站，使用 VitePress 构建。

## 🚀 特性

- 📚 完整的项目文档
- 🎨 现代化的设计风格
- 📱 响应式布局
- ⚡ 快速的构建速度
- 🔍 内置搜索功能

## 📖 本地开发

### 环境要求

- Node.js 18+
- Yarn

### 安装依赖

```bash
yarn install
```

### 启动开发服务器

```bash
yarn dev
```

访问 http://localhost:5173 查看网站。

### 构建生产版本

```bash
yarn build
```

### 预览生产版本

```bash
yarn preview
```

## 🌐 部署

本项目使用 GitHub Actions 自动部署到 GitHub Pages。

- 推送到 `main` 或 `master` 分支时会自动触发构建
- 构建完成后会自动部署到 GitHub Pages
- 网站地址：https://javen-yan.github.io/auto-upnp-doc

## 📁 项目结构

```
auto-upnp-web/
├── docs/                 # 文档目录
│   ├── guide/           # 指南文档
│   ├── usage/           # 使用文档
│   └── .vitepress/      # VitePress 配置
├── .github/workflows/   # GitHub Actions 配置
└── package.json         # 项目配置
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## �� 许可证

MIT License 
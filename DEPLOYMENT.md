# 部署说明

本项目使用 GitHub Actions 自动部署到 GitHub Pages。

## 🚀 自动部署设置

### 1. 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 `Settings` 标签页
3. 在左侧菜单中找到 `Pages`
4. 在 `Source` 部分选择 `GitHub Actions`

### 2. 推送代码

将代码推送到 GitHub 仓库的 `main` 或 `master` 分支：

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 3. 查看部署状态

1. 进入你的 GitHub 仓库
2. 点击 `Actions` 标签页
3. 查看 `Deploy to GitHub Pages` 工作流的运行状态

### 4. 访问网站

部署成功后，你的网站将在以下地址可用：
```
https://[你的用户名].github.io/auto-upnp-web
```

## 🔧 手动部署

如果需要手动部署，可以运行以下命令：

```bash
# 安装依赖
yarn install

# 构建项目
yarn build

# 预览构建结果
yarn preview
```

## 📝 注意事项

1. **分支名称**：确保你的主分支是 `main` 或 `master`
2. **权限设置**：GitHub Actions 需要 `pages: write` 权限
3. **构建时间**：首次构建可能需要几分钟时间
4. **缓存**：后续构建会更快，因为使用了依赖缓存

## 🐛 故障排除

### 构建失败

1. 检查 GitHub Actions 日志
2. 确保所有依赖都正确安装
3. 检查是否有死链接或语法错误

### 网站无法访问

1. 确认 GitHub Pages 已启用
2. 检查域名设置是否正确
3. 等待几分钟让 DNS 生效

### 权限问题

1. 确保仓库设置中启用了 GitHub Actions
2. 检查 Actions 权限设置
3. 确认工作流文件路径正确：`.github/workflows/deploy.yml`

## 📞 获取帮助

如果遇到问题，可以：

1. 查看 GitHub Actions 日志
2. 检查 [VitePress 文档](https://vitepress.dev/)
3. 提交 Issue 到项目仓库 
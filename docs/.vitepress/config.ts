import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/auto-upnp-doc/',
  title: 'Auto-UPnP',
  description: '自动暴露端口到路由器，NAS 快捷端口暴露，路由器设备, Openwrt/Linux/飞牛Nas',
  lang: 'zh-CN',
  
  head: [
    ['link', { rel: 'icon', href: '/auto-upnp-doc/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#0066cc' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],

  themeConfig: {
    logo: '/auto-upnp-doc/logo.svg',
    siteTitle: 'Auto-UPnP',
    
    nav: [
      { text: '主页', link: '/' },
      { text: '指引', link: '/guide/' },
      { text: '使用', link: '/usage/' },
      { text: 'GitHub', link: 'https://github.com/javen-yan/auto-upnp' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指引',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '安装', link: '/guide/install' },
            { text: '卸载', link: '/guide/uninstall' },
            { text: '升级', link: '/guide/upgrade' },
          ]
        }
      ],
      '/usage/': [
        {
          text: '使用教程',
          items: [
            { text: '基本使用', link: '/usage/' },
            { text: '配置说明', link: '/usage/configuration' },
            { text: '常见问题', link: '/usage/troubleshooting' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/javen-yan/auto-upnp' }
    ],

    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © 2024-present Auto-UPnP'
    },

    search: {
      provider: 'local'
    }
  }
}) 
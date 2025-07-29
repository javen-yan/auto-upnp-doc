import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Auto-UPnP',
  description: '自动暴露端口到路由器，NAS 快捷端口暴露，路由器设备, Openwrt/Linux/飞牛Nas',
  lang: 'zh-CN',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
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
            { text: '快速开始', link: '/guide/install' }
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
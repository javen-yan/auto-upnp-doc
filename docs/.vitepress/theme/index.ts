import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import GitHubBadges from './components/GitHubBadges.vue'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('GitHubBadges', GitHubBadges)
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-hero-after': () => h(GitHubBadges)
    })
  }
} 
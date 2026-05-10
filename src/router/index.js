import { createRouter, createWebHistory } from 'vue-router'
import MarkdownView from '../components/MarkdownView.vue'
import menuConfig from '../config/menu'

// 从菜单配置生成路由
const generateRoutes = (items) => {
  const routes = []
  items.forEach(item => {
    // 跳过首页，因为已经在下面单独定义了
    if (item.path === '/') return
    
    if (item.file) {
      routes.push({
        path: item.path,
        name: item.path.replace(/\//g, '-') || 'home',
        component: MarkdownView
      })
    }
    // 父菜单（有子项但无 file）重定向到第一个子页面
    if (item.children && !item.file && item.children.length > 0) {
      routes.push({
        path: item.path,
        redirect: item.children[0].path
      })
    }
    if (item.children) {
      routes.push(...generateRoutes(item.children))
    }
  })
  return routes
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: MarkdownView
  },
  ...generateRoutes(menuConfig)
]

const router = createRouter({
  history: createWebHistory('/slim/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router

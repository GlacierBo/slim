<template>
  <div id="app">
    <nav class="sidebar">
      <div class="sidebar-header">
        <div class="logo">💪</div>
        <h1>减肥指南</h1>
        <p class="subtitle">健康生活的开始</p>
      </div>
      
      <ul class="menu">
        <li v-for="item in menuConfig" :key="item.path" class="menu-item">
          <router-link :to="item.path" class="menu-link" v-if="item.file || item.children">
            <span class="icon">{{ getIcon(item.path) }}</span>
            <span class="title">{{ item.title }}</span>
          </router-link>
          <ul v-if="item.children" class="submenu">
            <li v-for="child in item.children" :key="child.path" class="submenu-item">
              <router-link :to="child.path" class="submenu-link">
                <span class="dot">•</span>
                {{ child.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      
      <div class="sidebar-footer">
        <a href="https://github.com/GlacierBo/slim" target="_blank" class="github-link">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </nav>
    
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import menuConfig from './config/menu'

// 为每个菜单项添加图标
const getIcon = (path) => {
  const icons = {
    '/': '🏠',
    '/eat': '🍽️',
    '/food': '🥗',
    '/short': '🏃',
    '/strong': '💪',
    '/faq': '❓'
  }
  return icons[path] || '📄'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  display: flex;
  min-height: 100vh;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}

/* 侧边栏样式 */
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  padding: 0;
  border-right: 1px solid #e9ecef;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
}

.sidebar-header {
  padding: 30px 20px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.logo {
  font-size: 3rem;
  margin-bottom: 10px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.sidebar h1 {
  font-size: 1.8rem;
  margin-bottom: 8px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: 300;
}

/* 菜单样式 */
.menu {
  list-style: none;
  padding: 20px 0;
  flex: 1;
}

.menu-item {
  margin: 5px 0;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #495057;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.menu-link:hover {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, transparent 100%);
  color: #667eea;
  border-left-color: #667eea;
  padding-left: 25px;
}

.menu-link.router-link-active {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.15) 0%, transparent 100%);
  color: #667eea;
  border-left-color: #667eea;
  font-weight: 600;
}

.icon {
  font-size: 1.3rem;
  margin-right: 12px;
  width: 24px;
  text-align: center;
}

.title {
  flex: 1;
}

/* 子菜单样式 */
.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.submenu-item {
  margin: 0;
}

.submenu-link {
  display: flex;
  align-items: center;
  padding: 8px 20px 8px 56px;
  color: #6c757d;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.submenu-link:hover {
  color: #667eea;
  background-color: rgba(102, 126, 234, 0.05);
  padding-left: 60px;
}

.submenu-link.router-link-active {
  color: #667eea;
  font-weight: 600;
  background-color: rgba(102, 126, 234, 0.1);
}

.dot {
  margin-right: 8px;
  color: #667eea;
  font-size: 1.2rem;
}

/* 侧边栏底部 */
.sidebar-footer {
  padding: 20px;
  border-top: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.github-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  color: #333;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.github-link:hover {
  background-color: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 内容区域 */
.content {
  flex: 1;
  padding: 40px;
  max-width: calc(100% - 280px);
  margin-left: 280px;
  background: white;
  min-height: 100vh;
}

.content h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.content h2 {
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: #34495e;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #667eea;
}

.content h3 {
  font-size: 1.4rem;
  margin: 1.5rem 0 1rem;
  color: #34495e;
  font-weight: 600;
}

.content p {
  margin: 1rem 0;
  line-height: 1.8;
  color: #555;
}

.content strong {
  color: #667eea;
  font-weight: 600;
}

.content a {
  color: #667eea;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.content a:hover {
  border-bottom-color: #667eea;
}

/* 响应式设计 */
@media (max-width: 768px) {
  #app {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid #dee2e6;
  }
  
  .content {
    margin-left: 0;
    max-width: 100%;
    padding: 20px;
  }
  
  .content h1 {
    font-size: 2rem;
  }
}

/* 滚动条样式 */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #667eea;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #764ba2;
}
</style>

<template>
  <div class="markdown-content">
    <div v-if="loading" class="loading">加载中...</div>
    <component :is="markdownComponent" v-else-if="markdownComponent" />
    <div v-else class="error">页面未找到</div>
  </div>
</template>

<script setup>
import { ref, watch, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import menuConfig from '../config/menu'

const route = useRoute()
const markdownComponent = shallowRef(null)
const loading = ref(true)

// 根据路由查找对应的 md 文件
const findMdFile = (path) => {
  const findInMenu = (items) => {
    for (const item of items) {
      if (item.path === path && item.file) {
        return item.file
      }
      if (item.children) {
        const found = findInMenu(item.children)
        if (found) return found
      }
    }
    return null
  }
  return findInMenu(menuConfig)
}

// Markdown 文件映射表（构建时确定）
const mdModules = import.meta.glob('../content/*.md')

// 动态加载 markdown 文件
const loadMarkdown = async (path) => {
  const mdFile = findMdFile(path)
  if (!mdFile) {
    console.error('未找到对应的 Markdown 文件:', path)
    loading.value = false
    return
  }

  try {
    loading.value = true
    // 使用 glob 导入的模块
    const modulePath = `../content/${mdFile}`
    if (mdModules[modulePath]) {
      const module = await mdModules[modulePath]()
      markdownComponent.value = module.default
    } else {
      console.error('找不到模块:', modulePath)
    }
  } catch (error) {
    console.error('加载 Markdown 文件失败:', error)
  } finally {
    loading.value = false
  }
}

// 监听路由变化，重新加载 markdown
watch(
  () => route.path,
  (newPath) => {
    loadMarkdown(newPath)
  },
  { immediate: true }
)
</script>

<style scoped>
.markdown-content {
  max-width: 900px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading,
.error {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 1.1rem;
}

.error {
  color: #e74c3c;
}

/* Markdown 样式优化 */
.markdown-content :deep(h1) {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  border-bottom: 3px solid;
  border-image: linear-gradient(to right, #667eea, #764ba2) 1;
  padding-bottom: 1rem;
  font-weight: 700;
}

.markdown-content :deep(h2) {
  font-size: 1.8rem;
  margin: 2.5rem 0 1.5rem;
  color: #34495e;
  font-weight: 600;
  position: relative;
  padding-left: 15px;
}

.markdown-content :deep(h2)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 70%;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.markdown-content :deep(h3) {
  font-size: 1.4rem;
  margin: 1.8rem 0 1rem;
  color: #34495e;
  font-weight: 600;
}

.markdown-content :deep(p) {
  margin: 1rem 0;
  line-height: 1.8;
  color: #333;
  font-size: 1rem;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.markdown-content :deep(li) {
  margin: 0.5rem 0;
  line-height: 1.7;
  color: #444;
}

.markdown-content :deep(ul li)::marker {
  color: #667eea;
}

.markdown-content :deep(a) {
  color: #667eea;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
  font-weight: 500;
}

.markdown-content :deep(a:hover) {
  border-bottom-color: #667eea;
  color: #764ba2;
}

.markdown-content :deep(strong) {
  color: #667eea;
  font-weight: 600;
  background: linear-gradient(120deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 2px 6px;
  border-radius: 3px;
}

.markdown-content :deep(code) {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0.2em 0.5em;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9em;
  color: #e74c3c;
  border: 1px solid #e1e4e8;
}

.markdown-content :deep(pre) {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  border-radius: 8px;
  padding: 20px;
  overflow: auto;
  margin: 1.5rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.markdown-content :deep(pre code) {
  background: transparent;
  padding: 0;
  border-radius: 0;
  color: #f8f8f2;
  border: none;
  font-size: 0.95rem;
  line-height: 1.6;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  border: 1px solid #e1e4e8;
  padding: 14px 16px;
  text-align: left;
}

.markdown-content :deep(th) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.markdown-content :deep(tr:nth-child(even)) {
  background-color: #f8f9fa;
}

.markdown-content :deep(tr:hover) {
  background-color: #e3f2fd;
  transition: background-color 0.3s ease;
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 2rem auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.markdown-content :deep(img:hover) {
  transform: scale(1.02);
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #667eea;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  color: #555;
  font-style: italic;
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.05) 0%, transparent 100%);
  border-radius: 0 8px 8px 0;
}

.markdown-content :deep(hr) {
  border: none;
  height: 2px;
  background: linear-gradient(to right, transparent, #667eea, #764ba2, transparent);
  margin: 2.5rem 0;
}
</style>

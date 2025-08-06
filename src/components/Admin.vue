<template>
  <div class="admin-container">
    <!-- 左侧导航栏 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>管理后台</h2>
        <p>欢迎回来，管理员</p>
      </div>
      
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li 
            v-for="item in menuItems" 
            :key="item.id"
            :class="{ 'active': $route.path.includes(item.id) }"
            @click="goMenu(item.id)"
          >
            <div class="nav-item">
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-text">{{ item.name }}</span>
            </div>
          </li>
        </ul>
      </nav>
      
      <div class="sidebar-footer">
        <button class="logout-btn" @click="handleLogout">
          <span>退出登录</span>
        </button>
      </div>
    </div>

    <!-- 右侧内容区域 -->
    <div class="main-content">
      <!-- 顶部导航栏 -->
      <div class="top-nav">
        <div class="breadcrumb">
          <span>{{ getCurrentMenuName() }}</span>
        </div>
        <div class="user-info">
          <span class="user-avatar">��</span>
          <span class="user-name">管理员</span>
          <span class="notification">🔔</span>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-area">
        <router-view />
      </div>
    </div>
  
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 菜单项
const menuItems = [
  { id: 'dashboard', name: '仪表板', icon: '🏠' },
  { id: 'users', name: '用户管理', icon: '👥' },
  { id: 'settings', name: '系统设置', icon: '⚙️' },
  { id: 'logs', name: '系统日志', icon: '📝' }
]

const activeMenu = ref('dashboard')

// 切换菜单
function goMenu(id: string) {
  router.push(`/admin/${id}`)
}

// 获取当前菜单名称
function getCurrentMenuName() {
  const item = menuItems.find(i => i.id === activeMenu.value)
  return item ? item.name : ''
}

// 退出登录
function handleLogout() {
  alert('已退出登录')
  // 这里可以跳转到登录页
}
</script>

<style scoped>
.admin-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 侧边栏 */
.sidebar {
  width: 220px;
  background: #fff;
  box-shadow: 2px 0 16px rgba(102, 126, 234, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-header {
  padding: 32px 24px 24px 24px;
  text-align: left;
  line-height: 1.5;
}

.sidebar-header h2 {
  margin: 0 0 8px 0;
  color: #667eea;
  font-size: 22px;
  font-weight: 700;
}

.sidebar-header p {
  margin: 0;
  color: #888;
  font-size: 13px;
}

.sidebar-nav {
  flex: 1;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  cursor: pointer;
  padding: 14px 28px;
  display: flex;
  align-items: center;
  border-left: 4px solid transparent;
  transition: background 0.2s, border-color 0.2s;
}

.nav-list li.active {
  background: linear-gradient(90deg, #667eea10 0%, #764ba210 100%);
  border-left: 4px solid #667eea;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-icon {
  font-size: 18px;
}

.nav-text {
  font-size: 15px;
  color: #333;
}

.sidebar-footer {
  padding: 0 24px;
}

.logout-btn {
  width: 100%;
  padding: 10px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-top: 20px;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* 主内容区 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* 顶部导航 */
.top-nav {
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
}

.breadcrumb {
  font-size: 16px;
  color: #667eea;
  font-weight: 600;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  background: #667eea;
  color: #fff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.user-name {
  color: #333;
  font-size: 15px;
}

.notification {
  font-size: 18px;
  color: #764ba2;
}

/* 内容区域 */
.content-area {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  background: none;
}

/* 页面头部 */
.page-header h1 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 26px;
  font-weight: 700;
}

.page-header p {
  margin: 0 0 24px 0;
  color: #888;
  font-size: 15px;
}

/* 仪表板统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.08);
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 18px;
}

.stat-icon {
  font-size: 32px;
  color: #667eea;
}

.stat-content h3 {
  margin: 0 0 6px 0;
  font-size: 15px;
  color: #888;
}

.stat-number {
  font-size: 22px;
  font-weight: 700;
  color: #333;
}

.stat-change {
  font-size: 13px;
  margin-left: 8px;
}

.stat-change.positive {
  color: #2ecc40;
}

.stat-change.negative {
  color: #ff4757;
}

/* 图表区 */
.charts-section {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
}

.chart-card {
  flex: 1;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.08);
  padding: 24px;
}

.chart-placeholder {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  background: #f7f8fa;
  border-radius: 8px;
  margin-top: 12px;
}

/* 用户管理表格 */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 10px;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.btn-secondary {
  background: #e1e5e9;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.btn-small {
  background: #f7f8fa;
  color: #667eea;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 13px;
  margin-right: 6px;
  cursor: pointer;
}

.btn-small.danger {
  color: #ff4757;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-box input {
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 14px;
}

.search-btn {
  background: #667eea;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
}

.table-container {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.08);
  padding: 18px;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.data-table th {
  color: #667eea;
  font-weight: 600;
  background: #f7f8fa;
}

.status {
  padding: 2px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}

.status.active {
  background: #e6f7ec;
  color: #2ecc40;
}

.status.disabled {
  background: #ffeaea;
  color: #ff4757;
}

/* 设置区 */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.setting-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.08);
  padding: 24px;
}

.setting-item {
  margin-bottom: 16px;
}

.setting-item label {
  display: block;
  margin-bottom: 6px;
  color: #888;
  font-size: 14px;
}

.setting-item input,
.setting-item textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 4px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #e1e5e9;
  border-radius: 22px;
  transition: .4s;
}

.switch input:checked + .slider {
  background-color: #667eea;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: .4s;
}

.switch input:checked + .slider:before {
  transform: translateX(18px);
}

/* 日志区 */
.log-filters {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
}

.log-level, .log-date {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #e1e5e9;
  font-size: 14px;
}

.log-container {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.08);
  padding: 18px;
}

.log-item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.log-item:last-child {
  border-bottom: none;
}

.log-item.error .log-level {
  color: #ff4757;
}

.log-item.warning .log-level {
  color: #ffb300;
}

.log-item.info .log-level {
  color: #667eea;
}

.log-time {
  color: #888;
  font-size: 13px;
  min-width: 140px;
}

.log-level {
  font-weight: 700;
  min-width: 60px;
}

.log-message {
  color: #333;
}

/* 响应式 */
@media (max-width: 900px) {
  .admin-container {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    padding: 0;
  }
  .main-content {
    padding: 0;
  }
}

@media (max-width: 600px) {
  .content-area {
    padding: 12px;
  }
  .top-nav {
    padding: 0 12px;
  }
  .sidebar-header {
    padding: 18px 12px 12px 12px;
  }
}
</style> 
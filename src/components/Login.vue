<template>
  <div class="login-container">
    <div class="login-card">
      <div class="card-header">
        <h2>{{ isLogin ? '欢迎回来' : '创建账户' }}</h2>
        <p>{{ isLogin ? '请登录您的账户' : '请填写以下信息注册' }}</p>
      </div>

      <!-- 登录表单 -->
      <form v-if="isLogin" @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="login-email">邮箱地址</label>
          <input
            id="login-email"
            v-model="loginForm.email"
            type="email"
            placeholder="请输入邮箱地址"
            required
            :class="{ 'error': loginErrors.email }"
          />
          <span v-if="loginErrors.email" class="error-message">{{ loginErrors.email }}</span>
        </div>

        <div class="form-group">
          <label for="login-password">密码</label>
          <div class="password-input">
            <input
              id="login-password"
              v-model="loginForm.password"
              :type="showLoginPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              required
              :class="{ 'error': loginErrors.password }"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showLoginPassword = !showLoginPassword"
            >
              {{ showLoginPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <span v-if="loginErrors.password" class="error-message">{{ loginErrors.password }}</span>
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="loginForm.remember" />
            <span>记住我</span>
          </label>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>

      <!-- 注册表单 -->
      <form v-else @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="register-username">用户名</label>
          <input
            id="register-username"
            v-model="registerForm.username"
            type="text"
            placeholder="请输入用户名"
            required
            :class="{ 'error': registerErrors.username }"
          />
          <span v-if="registerErrors.username" class="error-message">{{ registerErrors.username }}</span>
        </div>

        <div class="form-group">
          <label for="register-email">邮箱地址</label>
          <input
            id="register-email"
            v-model="registerForm.email"
            type="email"
            placeholder="请输入邮箱地址"
            required
            :class="{ 'error': registerErrors.email }"
          />
          <span v-if="registerErrors.email" class="error-message">{{ registerErrors.email }}</span>
        </div>

        <div class="form-group">
          <label for="register-password">密码</label>
          <div class="password-input">
            <input
              id="register-password"
              v-model="registerForm.password"
              :type="showRegisterPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              required
              :class="{ 'error': registerErrors.password }"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showRegisterPassword = !showRegisterPassword"
            >
              {{ showRegisterPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <span v-if="registerErrors.password" class="error-message">{{ registerErrors.password }}</span>
        </div>

        <div class="form-group">
          <label for="register-confirm-password">确认密码</label>
          <div class="password-input">
            <input
              id="register-confirm-password"
              v-model="registerForm.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="请再次输入密码"
              required
              :class="{ 'error': registerErrors.confirmPassword }"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              {{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <span v-if="registerErrors.confirmPassword" class="error-message">{{ registerErrors.confirmPassword }}</span>
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="registerForm.agree" required />
            <span>我同意 <a href="#" class="terms-link">服务条款</a> 和 <a href="#" class="terms-link">隐私政策</a></span>
          </label>
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? '注册中...' : '注册' }}
        </button>
      </form>

      <!-- 切换按钮 -->
      <div class="switch-form">
        <p>
          {{ isLogin ? '还没有账户？' : '已有账户？' }}
          <button type="button" @click="toggleForm" class="switch-btn">
            {{ isLogin ? '立即注册' : '立即登录' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 响应式数据
const isLogin = ref(true)
const isLoading = ref(false)
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

// 登录表单数据
const loginForm = reactive({
  email: '',
  password: '',
  remember: false
})

// 注册表单数据
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false
})

// 错误信息
const loginErrors = reactive({
  email: '',
  password: ''
})

const registerErrors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 切换登录/注册表单
const toggleForm = () => {
  isLogin.value = !isLogin.value
  clearErrors()
  clearForms()
}

// 清除错误信息
const clearErrors = () => {
  Object.keys(loginErrors).forEach(key => {
    loginErrors[key as keyof typeof loginErrors] = ''
  })
  Object.keys(registerErrors).forEach(key => {
    registerErrors[key as keyof typeof registerErrors] = ''
  })
}

// 清除表单数据
const clearForms = () => {
  Object.keys(loginForm).forEach(key => {
    loginForm[key as keyof typeof loginForm] = key === 'remember' ? false : ''
  })
  Object.keys(registerForm).forEach(key => {
    registerForm[key as keyof typeof registerForm] = key === 'agree' ? false : ''
  })
}

// 验证邮箱格式
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 验证密码强度
const validatePassword = (password: string): string => {
  if (password.length < 6) {
    return '密码长度至少6位'
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return '密码必须包含小写字母'
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return '密码必须包含大写字母'
  }
  if (!/(?=.*\d)/.test(password)) {
    return '密码必须包含数字'
  }
  return ''
}

// 处理登录
const handleLogin = async () => {
  clearErrors()
  
  // 表单验证
  if (!loginForm.email) {
    loginErrors.email = '请输入邮箱地址'
    return
  }
  if (!validateEmail(loginForm.email)) {
    loginErrors.email = '请输入有效的邮箱地址'
    return
  }
  if (!loginForm.password) {
    loginErrors.password = '请输入密码'
    return
  }

  isLoading.value = true
  
  try {
    // 这里添加实际的登录逻辑
    console.log('登录信息:', loginForm)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 登录成功后的处理
    alert('登录成功！')
    router.push('/admin')
    
  } catch (error) {
    console.error('登录失败:', error)
    alert('登录失败，请重试')
  } finally {
    isLoading.value = false
  }
}

// 处理注册
const handleRegister = async () => {
  clearErrors()
  
  // 表单验证
  if (!registerForm.username) {
    registerErrors.username = '请输入用户名'
    return
  }
  if (registerForm.username.length < 3) {
    registerErrors.username = '用户名长度至少3位'
    return
  }
  
  if (!registerForm.email) {
    registerErrors.email = '请输入邮箱地址'
    return
  }
  if (!validateEmail(registerForm.email)) {
    registerErrors.email = '请输入有效的邮箱地址'
    return
  }
  
  if (!registerForm.password) {
    registerErrors.password = '请输入密码'
    return
  }
  const passwordError = validatePassword(registerForm.password)
  if (passwordError) {
    registerErrors.password = passwordError
    return
  }
  
  if (!registerForm.confirmPassword) {
    registerErrors.confirmPassword = '请确认密码'
    return
  }
  if (registerForm.password !== registerForm.confirmPassword) {
    registerErrors.confirmPassword = '两次输入的密码不一致'
    return
  }
  
  if (!registerForm.agree) {
    alert('请同意服务条款和隐私政策')
    return
  }

  isLoading.value = true
  
  try {
    // 这里添加实际的注册逻辑
    console.log('注册信息:', registerForm)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 注册成功后的处理
    alert('注册成功！')
    isLogin.value = true
    clearForms()
    
  } catch (error) {
    console.error('注册失败:', error)
    alert('注册失败，请重试')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  text-align: center;
  margin-bottom: 30px;
}

.card-header h2 {
  color: #333;
  margin: 0 0 10px 0;
  font-size: 28px;
  font-weight: 600;
}

.card-header p {
  color: #666;
  margin: 0;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input.error {
  border-color: #ff4757;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  padding: 0;
}

.password-toggle:hover {
  color: #333;
}

.error-message {
  color: #ff4757;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.forgot-password {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.terms-link {
  color: #667eea;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.switch-form {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #e1e5e9;
}

.switch-form p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.switch-btn {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}

.switch-btn:hover {
  color: #764ba2;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
    margin: 10px;
  }
  
  .card-header h2 {
    font-size: 24px;
  }
  
  .form-options {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}
</style>

// src/services/axiosClient.js
import axios from 'axios'
import { tokenStore } from '@/stores/tokenStore'

// Можно указать URL вашей API в переменную окружения или непосредственно
// baseURL: 'http://127.0.0.1:8000'
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
})

// Добавляем перехватчик запросов (request interceptor)
axiosClient.interceptors.request.use((config) => {
  const store = tokenStore()
  if (store.token) {
    config.headers.Authorization = `Token ${store.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Можно также добавить перехватчик ответов (response interceptor)
// для глобальной обработки ошибок
axiosClient.interceptors.response.use(
  response => response,
  error => {
    // Тут можно обрабатывать 401, 403 и т.д.
    return Promise.reject(error)
  }
)

export default axiosClient

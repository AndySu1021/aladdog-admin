import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/storage'

// create an axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: false,
  timeout: 5000
})

// request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['X-Token'] = `${token}`
    }
    return config
  },
  (error) => {
    // for debug
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
instance.interceptors.response.use(
  // HTTP Status Code 為 200
  (response) => {
    const res = response.data
    // 若 res.code 不為 0 則直接跳錯誤訊息
    if (res.code !== 0) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  // HTTP Status Code 不為 200 時的error處理
  (error) => {
    switch (error.response.status) {
      case 401:
        break
      default:
        ElMessage({
          message: error.response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
        break
    }
    return Promise.reject(error)
  }
)

export default instance

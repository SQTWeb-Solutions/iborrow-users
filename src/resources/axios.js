import axios from 'axios'
import store from '@/store'
import router from '@/router'

// default axios information
axios.defaults.baseURL = process.env.API_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// Request interceptor
axios.interceptors.request.use(request => {
  const token = store.getters['auth/token']
  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`
  }
  // request.headers['X-Socket-Id'] = Echo.socketId()

  return request
})

// Function to log user out of the application if the token expired
async function logout () {
  try {
    await store.dispatch('auth/logout')
    router.push({ name: 'login' })
  } catch (e) {
    console.log(e)
  }
}

// Response interceptor
axios.interceptors.response.use(response => response, error => {
  const { status } = error.response

  if (status >= 500) {
    console.log(status)
  }

  if (status === 401 && store.getters['auth/check']) {
    console.log('loggin user out now')
    logout()
  }

  return Promise.reject(error)
})

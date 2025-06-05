// src/services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true, // optional: if using session auth or CSRF
})

export default api

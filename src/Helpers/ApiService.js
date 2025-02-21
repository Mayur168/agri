// apiService.js
import axios from 'axios'
// import { BASEURL } from '../constant'

// Create an Axios instance with the base URL
const api = axios.create({
  BASEURL: process.env.REACT_APP_BASE_URL || 'https://agri-management-main-ywm4.vercel.app/' // Replace with your actual API base URL
})

// Function to set the Authorization header for Axios
export const setAuthToken = token => {
  if (token) {
    // If a token is provided, set it as the Authorization header
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    // If no token is provided, remove the Authorization header
    delete api.defaults.headers.common['Authorization']
  }
}

// Axios response interceptor to handle unauthorized access (401)
api.interceptors.response.use(
  response => {
    return response // Return the response data if the request is successful
  },
  error => {
    if (error.response && error.response.status === 401) {
      // If the response status is 401 (Unauthorized), perform the following:
      console.warn('Unauthorized access - possibly due to expired token.')
      localStorage.removeItem('token') // Remove the token from local storage
      delete api.defaults.headers.common['Authorization'] // Remove the Authorization header

      // Optionally, redirect the user to the login page
      // window.location.href = '/login';
    }
    console.error('API Error:', error) // Log the error for debugging
    return Promise.reject(error) // Reject the error for further handling
  }
)

export default api
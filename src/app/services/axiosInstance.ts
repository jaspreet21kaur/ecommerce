import axios from 'axios'
import auth from '@/config/auth';

// console.log("axios------",process.env.NEXT_PUBLIC_API_BASE_URL)
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

const getToken = () => {
  return window.localStorage.getItem(auth.storageTokenKeyName);
};

axiosInstance.interceptors.request.use(
  request => {
    const storedToken = getToken();
    // console.log("tokn headersss",storedToken)
    if (storedToken !== null) {
      request.headers.Authorization = `Bearer ${storedToken}`
    }

    return request
  },
  error => {
    return Promise.reject(error)
  }
)


// axiosInstance.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     if (error.response?.status === 401 || 404) {
//         console.log("error",error.response)
//       if (typeof window !== 'undefined'){
//         console.log("storedToken undefined")
//         // window.location.replace('/')
//       }
//     }
//     return Promise.reject(error)
//   }
// )

export default axiosInstance

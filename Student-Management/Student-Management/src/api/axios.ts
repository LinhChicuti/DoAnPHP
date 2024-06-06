import axios from 'axios'
import { HttpResponse } from '../models/http'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
  withCredentials: false,
})

const handleRequest = (promise: Promise<HttpResponse>) => {
  return promise.then((res) => res).catch((err) => err as HttpResponse<any>)
}

export default axiosClient

export { handleRequest }

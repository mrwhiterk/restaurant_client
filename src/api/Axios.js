import axios from 'axios'

console.log(process.env.NODE_ENV)
export const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:3001'
      : 'https://ryan-orderapp.herokuapp.com'
})

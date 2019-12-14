import { Axios } from './Axios'
import jwt_decode from 'jwt-decode'
import setAuthJWT from './setAuthJWT'

export const apiAuth = () => {
  const token = localStorage.getItem('jwtToken')

  if (!token) {
    return false
  }
  const decoded = jwt_decode(token)

  const currentTime = Date.now() / 1000

  if (decoded.exp < currentTime) {
    localStorage.removeItem('jwtToken')

    setAuthJWT(null)

    return false
  } else {
    setAuthJWT(token)

    const user = {
      id: decoded._id
    }

    return user
  }
}

export const logoutUser = async function() {
  apiAuth()

  try {
    localStorage.removeItem('jwtToken')
    this.setState({ isAuthenticated: false, errMessage: '', showErr: false })
    await Axios.post('/api/users/logout', axiosConfig)
  } catch (e) {
    console.log('error ', e)
  }
}

export const submitOrder = async order => {
  apiAuth()

  try {
    let result = await Axios.post('/api/orders', order, axiosConfig)
    console.log(result)
  } catch (e) {
    console.log('error', e)
  }
}

export const getUserOrders = async () => {
  apiAuth()

  try {
    let result = await Axios.get('/api/orders', axiosConfig)

    console.log(result)

    return result
  } catch (e) {
    console.log('error', e)
  }
}

export const removeUserCurrentOrder = async () => {
  apiAuth()

  try {
    let result = await Axios.delete('/api/users/removeCurrentOrder')
    console.log(result)
  } catch (e) {
    console.log('error', e)
  }
}

export const cancelOrder = async id => {
  apiAuth()

  try {
    let result = await Axios.put(`/api/orders/cancel/${id}`)
    console.log(result)
  } catch (e) {
    console.log('error', e)
  }
}

export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
}

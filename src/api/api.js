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

export const getLoggedInUser = async () => {
  apiAuth()
  try {
    let result = await Axios.get('/api/users/me', axiosConfig)
    return result.data;

  } catch (e) {
    console.log('error', e)
  }

}

export const logoutUser = async function() {
  apiAuth()

  try {
    localStorage.removeItem('jwtToken')
    this.setState(
      {
        isAuthenticated: false,
        isAdmin: false,
        errMessage: '',
        showErr: false,
        toLogin: true
      },
      async () => {
        await Axios.post('/api/users/logout', axiosConfig)
      }
    )
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

    // console.log(result)

    return result
  } catch (e) {
    console.log('error', e)
  }
}

export const getAllOrders = async () => {
  apiAuth()

  try {
    let result = await Axios.get(`/api/orders/all/`, axiosConfig)

    // console.log(result)

    return result
  } catch (e) {
    console.log('error', e)
  }
}
export const getSelectOrders = async (isActive) => {
  apiAuth()

  try {
    let result = await Axios.get(`/api/orders/all/${isActive}`, axiosConfig)

    // console.log(result)

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

export const getMenu = async () => {
  apiAuth()

  try {
    let result = await Axios.get(
      process.env.REACT_APP_MENU_URL + 'menu.json',
      axiosConfig
    )

    console.log(result)

    return result.data
  } catch (e) {
    console.log('error', e)
  }
}

export const cancelOrder = async function(id) {
  apiAuth()

  try {
    await Axios.put(`/api/orders/cancel/${id}`)

    this.setOrders()
  } catch (e) {
    console.log('error', e)
  }
}

export const resumeOrder = async function (id) {
  apiAuth()

  try {
    await Axios.put(`/api/orders/resume/${id}`)

    this.setOrders()
  } catch (e) {
    console.log('error', e)
  }
}

export const completeOrder = async function (id) {
  apiAuth()

  try {
    await Axios.put(`/api/orders/complete/${id}`)

    this.setOrders()
  } catch (e) {
    console.log('error', e)
  }
}
export const markOrderIncomplete = async function (id) {
  apiAuth()

  try {
    await Axios.put(`/api/orders/incomplete/${id}`)

    this.setOrders()
  } catch (e) {
    console.log('error', e)
  }
}
export const archive = async function (id) {
  apiAuth()

  try {
    await Axios.put(`/api/orders/archive/${id}`)

    this.setActiveOrders()
  } catch (e) {
    console.log('error', e)
  }
}
export const activate = async function (id) {
  apiAuth()

  try {
    await Axios.put(`/api/orders/activate/${id}`)

    this.setActiveOrders()
  } catch (e) {
    console.log('error', e)
  }
}

export const getOrdersCount = async function () {
  apiAuth()

  try {
    return await Axios.put(`/api/orders/getOrdersCount`)

  } catch (e) {
    console.log('error', e)
  }
}

export const getActiveOrdersCount = async function () {
  apiAuth()

  try {
    return await Axios.put(`/api/orders/getActiveOrdersCount`)

  } catch (e) {
    console.log('error', e)
  }
}

export const getArchivedOrdersCount = async function () {
  apiAuth()

  try {
    return await Axios.put(`/api/orders/getArchivedOrdersCount`)

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

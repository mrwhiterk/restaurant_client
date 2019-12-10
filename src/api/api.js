import { axios } from './Axios';
import jwt_decode from 'jwt-decode';
import setAuthJWT from './setAuthJWT';

export const apiAuth = () => {
  const token = localStorage.getItem("jwtToken")

  if (!token) {
    return false;
  }
  const decoded = jwt_decode(token);

  console.log(decoded)
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    localStorage.removeItem("jwtToken")

    setAuthJWT(null)

    return false;
  } else {
    setAuthJWT(token);

    const user = {
      id: decoded._id
    }

    return user;
  }

}

export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
}


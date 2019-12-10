import { axios } from './Axios';
import jwt_decode from 'jwt-decode';
import setAuthJWT from './setAuthJWT';

export const apiAuth = () => {
  const token = localStorage.getItem("jwtToken")
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    localStorage.removeItem("jwtToken")

    setAuthJWT(null)

    return false;
  } else {
    setAuthJWT(token);

    const user = {
      id: decoded.id,
      email: decoded.email
    }

    return user;
  }

}

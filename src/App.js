import React, { Component } from 'react'
import './App.css'

import LoginForm from './Components/LoginForm/LoginForm'
import Navbar from './Components/Navigation/Navbar/Navbar'

import { Axios } from './api/Axios'
import jwt_decode from 'jwt-decode'
import setAuthJWT from './api/setAuthJWT'

import { apiAuth } from './api/api'

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
}

class App extends Component {
  state = {
    isAuthenticated: false,
    email: '',
    password: ''
  }

  handleLoginSubmit = e => {
    e.preventDefault()

    let user = {
      email: this.state.email,
      password: this.state.password
    }

    Axios.post('/api/users/login', user, axiosConfig)
      .then(result => {
        // console.log(result.data)
        const { token } = result.data
        // console.log(token)
        localStorage.setItem('jwtToken', token)
        const decoded = jwt_decode(token)
        setAuthJWT(token)

        // console.log(decoded)
        this.setState({ isAuthenticated: true })
        return decoded
      })
      .catch(error => console.log('dog ', error.message))
  }

  deleteTokens = () => {
    let data = apiAuth()

    console.log(data)

    Axios.delete('/api/users/me', axiosConfig)
      .then(result => {
        console.log(result)
      })
      .catch(error => console.log(error.response.data.message))
  }

  handleLoginChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      console.log(this.state)
    )
  }

  render() {
    let hiddenPage = <h1>Not authenticated</h1>

    if (this.state.isAuthenticated) {
      hiddenPage = <h1>You have authenticated</h1>
    }

    return (
      <div className="App">
        <Navbar />
        <LoginForm
          email={this.state.email}
          password={this.state.password}
          handleSubmit={this.handleLoginSubmit}
          handleChange={this.handleLoginChange}
        />
        <div className="text-center">
          <button onClick={this.deleteTokens}>delete tokens</button>
          {hiddenPage}
        </div>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import './App.css'
import { Link, Route, Switch } from 'react-router-dom'

import LoginForm from './Components/LoginForm/LoginForm'
import SignupForm from './Components/SignupForm/SignupForm'
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

  handleSignupSubmit = e => {
    e.preventDefault()

    console.log('handle signup')
  }

  handleLoginSubmit = e => {
    e.preventDefault()

    let user = {
      email: this.state.email,
      password: this.state.password
    }

    Axios.post('/api/users/login', user, axiosConfig)
      .then(result => {
        const { token } = result.data

        localStorage.setItem('jwtToken', token)
        const decoded = jwt_decode(token)
        setAuthJWT(token)

        this.setState({ isAuthenticated: true, email: '', password: ''})
        return decoded
      })
      .catch(error => console.log('dog ', error.message))
  }

  componentDidMount() {
    let data = apiAuth()

    if (data) {
      this.setState({ isAuthenticated: true})
    }
  }

  // delete user works
  deleteUser = () => {
    let data = apiAuth()
    Axios.delete('/api/users/me', axiosConfig)
      .then(result => {
        console.log(result)
        localStorage.removeItem('jwtToken')
        this.setState({ isAuthenticated: false})
      })
      .catch(error => console.log(error.response.data.message))
  }

  handleChange = e => {
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
        <Navbar isAuth={this.state.isAuthenticated} />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <LoginForm
                email={this.state.email}
                password={this.state.password}
                handleSubmit={this.handleLoginSubmit}
                handleChange={this.handleChange}
              />
            )}
          />
          <Route
            path="/signup"
            render={() => (
              <SignupForm
                email={this.state.email}
                password={this.state.password}
                handleSubmit={this.handleSignupSubmit}
                handleChange={this.handleChange}
              />
            )}
          />
        </Switch>

        <div className="text-center">
          <button onClick={this.deleteUser}>delete user</button>
          {hiddenPage}
        </div>
      </div>
    )
  }
}

export default App

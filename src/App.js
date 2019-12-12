import React, { Component } from 'react'
import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom'

import LoginForm from './Components/LoginForm/LoginForm'
import SignupForm from './Components/SignupForm/SignupForm'
import Navbar from './Components/Navigation/Navbar/Navbar'
import Menu from './Components/Menu/Menu'

import { Axios } from './api/Axios'
import jwt_decode from 'jwt-decode'
import setAuthJWT from './api/setAuthJWT'

import { apiAuth, axiosConfig, logoutUser } from './api/api'
import { setFlash } from './helperMethods'
// import { Button } from 'react-bootstrap';

class App extends Component {
  state = {
    isAuthenticated: false,
    email: '',
    password: '',
    passwordConfirm: '',
    errMessage: '',
    showErr: false
  }

  handleSignupSubmit = async e => {
    e.preventDefault()

    setFlash.call(this, false, '')

    if (this.state.password !== this.state.passwordConfirm) {
      setFlash.call(this, true, "password confirmation doesn't match")
      return
    }

    let user = {
      email: this.state.email,
      password: this.state.password
    }

    try {
      let result = await Axios.post('/api/users/signup', user, axiosConfig)
      let decoded = this.setAuthTokenLocalStorage(result)
      return decoded
    } catch (e) {
      if (e.message.includes('450')) {
        setFlash.call(this, true, 'Email is used on an existing account')
      }
    }
  }

  setAuthTokenLocalStorage = result => {
    const { token } = result.data

    localStorage.setItem('jwtToken', token)
    const decoded = jwt_decode(token)
    setAuthJWT(token)

    this.setState({
      isAuthenticated: true,
      email: '',
      password: '',
      passwordConfirm: ''
    })
    setFlash.call(this, false, '')

    return decoded
  }

  handleLoginSubmit = async e => {
    e.preventDefault()

    let user = {
      email: this.state.email,
      password: this.state.password
    }

    try {
      let result = await Axios.post('/api/users/login', user, axiosConfig)
      let decoded = this.setAuthTokenLocalStorage(result)
      return decoded
    } catch (e) {
      if (e.message.includes('400')) {
        setFlash.call(this, true, 'Invalid username or password')
      }
    }
  }

  componentDidMount() {
    let data = apiAuth()

    if (data) {
      this.setState({ isAuthenticated: true })
    }
  }

  deleteUser = () => {
    apiAuth()
    Axios.delete('/api/users/me', axiosConfig)
      .then(result => {
        localStorage.removeItem('jwtToken')
        this.setState({ isAuthenticated: false })
      })
      .catch(error => console.log(error.response.data.message))
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    // let hiddenPage = <h1>Not authenticated</h1>

    // if (this.state.isAuthenticated) {
    //   hiddenPage = <h1>You have authenticated</h1>
    // }

    let errorFlash = (
      <div className="alert alert-danger" role="alert">
        {this.state.errMessage}
      </div>
    )

    let authForms = (
      <>
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
              passwordConfirm={this.state.passwordConfirm}
              handleSubmit={this.handleSignupSubmit}
              handleChange={this.handleChange}
            />
          )}
        />
      </>
    )

    return (
      <div className="App">
        <Navbar
          isAuth={this.state.isAuthenticated}
          logout={logoutUser.bind(this)}
        />
        {this.state.showErr ? errorFlash : null}
        {this.state.isAuthenticated ? (
          <Route path="/" component={Menu} />
          ) : null}
        <Switch>
          {!this.state.isAuthenticated ? authForms : null}
          <Redirect from="/" to="/" />
        </Switch>

        <div className="text-center">
          
          {/* <button onClick={this.deleteUser}>delete user</button> */}
          {/* {hiddenPage} */}
        </div>
      </div>
    )
  }
}

export default App

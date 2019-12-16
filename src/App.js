import React, { Component } from 'react'
import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom'

import LoginForm from './Components/LoginForm/LoginForm'
import SignupForm from './Components/SignupForm/SignupForm'
import Navbar from './Components/Navigation/Navbar/Navbar'
import Menu from './Components/Menu/Menu'
import Orders from './Components/Orders/Orders'
import Dashboard from './Components/Dashboard/Dashboard'

import { Axios } from './api/Axios'
import jwt_decode from 'jwt-decode'
import setAuthJWT from './api/setAuthJWT'

import { apiAuth, axiosConfig, logoutUser, getLoggedInUser } from './api/api'
import { setFlash } from './helperMethods'

class App extends Component {
  state = {
    isAuthenticated: false,
    isAdmin: false,
    email: '',
    password: '',
    passwordConfirm: '',
    errMessage: '',
    showErr: false,
    toLogin: false
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
      console.log(this.props)
      return decoded
      // return decoded
    } catch (e) {
      if (e.message.includes('450')) {
        setFlash.call(this, true, 'Email is used on an existing account')
      }
    }
  }

  setAuthTokenLocalStorage = result => {
    const { token, user } = result.data

    localStorage.setItem('jwtToken', token)
    const decoded = jwt_decode(token)
    setAuthJWT(token)

    this.setState({
      isAuthenticated: true,
      email: '',
      password: '',
      passwordConfirm: '',
      isAdmin: user.admin
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
      console.log(result)
      let decoded = this.setAuthTokenLocalStorage(result)
      return decoded
    } catch (e) {
      if (e.message.includes('400')) {
        setFlash.call(this, true, 'Invalid username or password')
      }
    }
  }

  async componentDidMount() {
    let idObj = apiAuth()

    
    if (idObj) {
      let user = await getLoggedInUser()
      if (user) {
        this.setState({ isAuthenticated: true, isAdmin: user.admin })

      }
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
    // todo - fix width of alert button
    let errorFlash = (
      <div className="alert alert-danger" role="alert">
        {this.state.errMessage}
      </div>
    )

    if (this.state.toLogin) {
      this.setState({ toLogin: false })
      return <Redirect to="/" />
    }

    let router = (
      <Switch>
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
      </Switch>
    )

    if (this.state.isAuthenticated) {
      router = (
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" exact component={Menu} />
          <Redirect from="/signup" to="/" />
        </Switch>
      )
    }

    return (
      <div className="App">
        <Navbar
          isAuth={this.state.isAuthenticated}
          isAdmin={this.state.isAdmin}
          logout={logoutUser.bind(this)}
        />
        {this.state.showErr && errorFlash}
        {router}
      </div>
    )
  }
}

export default App

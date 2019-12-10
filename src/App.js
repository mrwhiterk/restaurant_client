import React, { Component } from 'react'
import './App.css'
import { Link, Route, Switch } from 'react-router-dom'

import LoginForm from './Components/LoginForm/LoginForm'
import SignupForm from './Components/SignupForm/SignupForm'
import Navbar from './Components/Navigation/Navbar/Navbar'

import { Axios } from './api/Axios'
import jwt_decode from 'jwt-decode'
import setAuthJWT from './api/setAuthJWT'

import { apiAuth, axiosConfig } from './api/api'




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

    console.log('handle signup')

    if (this.state.password !== this.state.passwordConfirm) {
      alert("password confirmation doesn't match")
      return;
    }

    let user = {
      email: this.state.email,
      password: this.state.password
    }

    try {
      let result = await Axios.post('/api/users/signup', user, axiosConfig);
      let decoded = this.setAuthTokenLocalStorage(result);
      return decoded
      
    } catch (e) {
      console.log('error ', e)
    }


  }

  setAuthTokenLocalStorage = (result) => {
    const { token } = result.data

    console.log(token)

    localStorage.setItem('jwtToken', token)
    const decoded = jwt_decode(token)
    setAuthJWT(token)

    this.setState({
      isAuthenticated: true,
      email: '',
      password: '',
      passwordConfirm: ''
    })
    this.removeFlash()
    
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
        this.setState({ showErr: true, errMessage: 'Invalid username or password' })
      }
    }
  }

  componentDidMount() {
    let data = apiAuth()

    if (data) {
      this.setState({ isAuthenticated: true})
    }
  }

  componentDidUpdate() {
    
  }

  deleteUser = () => {
    let data = apiAuth()
    Axios.delete('/api/users/me', axiosConfig)
      .then(result => {
        localStorage.removeItem('jwtToken')
        this.setState({ isAuthenticated: false})
      })
      .catch(error => console.log(error.response.data.message))
  }

  logoutUser = async () => {
    let applyToken = apiAuth()
    console.log(applyToken)
    try {
      let result = await Axios.post('/api/users/logout', axiosConfig)
      localStorage.removeItem('jwtToken')
      this.setState({ isAuthenticated: false })

    } catch (e) {
      console.log('error ', e)
    }
  }

  removeFlash = () => {
    if (this.state.showErr) {
      this.setState({ showErr: false, errMessage: '' })
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    let hiddenPage = <h1>Not authenticated</h1>

    if (this.state.isAuthenticated) {
      hiddenPage = <h1>You have authenticated</h1>
    }

    let errorFlash = (
      <div class="alert alert-danger" role="alert">
        {this.state.errMessage}
      </div>
    )

    return (
      <div className="App">
        <Navbar isAuth={this.state.isAuthenticated} logout={this.logoutUser} />
        {this.state.showErr ? errorFlash : null}
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
                passwordConfirm={this.state.passwordConfirm}
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

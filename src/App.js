import React, { Component } from 'react'
import './App.css'

import LoginForm from './Components/LoginForm/LoginForm'
import Navbar from './Components/Navigation/Navbar/Navbar'

class App extends Component {
  state = {
    isAuthenticated: false,
    email: '',
    password: ''
  }

  handleLoginSubmit = e => {
    e.preventDefault()
    console.log('submitted')
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
        {hiddenPage}
      </div>
    )
  }
}

export default App

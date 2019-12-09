import React, { Component } from 'react'
import './App.css'

import LoginForm from './Components/LoginForm/LoginForm'
import Navbar from './Components/Navigation/Navbar/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <LoginForm />
      </div>
    )
  }
}

export default App

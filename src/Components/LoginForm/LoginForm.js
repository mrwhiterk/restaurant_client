import React from 'react'
import './LoginForm.css'

import PropTypes from 'prop-types'

const loginForm = (props) => {

    return (
      <form className="LoginForm" onSubmit={props.handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={props.email}
            onChange={props.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={props.password}
            onChange={props.handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    )
  
}

loginForm.propTypes = {
  handleSubmit: PropTypes.func,
  email: PropTypes.string,
  handleChange: PropTypes.func,
  password: PropTypes.string,
}

export default loginForm

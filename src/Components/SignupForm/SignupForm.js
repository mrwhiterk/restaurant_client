import React, { Component } from 'react'
import './SignupForm.css'

const signupForm = props => {
  return (
    <form className="SignupForm" onSubmit={props.handleSubmit}>
      <h2>Signup</h2>
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
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          name="passwordConfirm"
          value={props.passwordConfirm}
          onChange={props.handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}

export default signupForm

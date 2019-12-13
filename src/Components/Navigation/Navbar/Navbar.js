import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { GoSignOut } from 'react-icons/go'

const navbar = props => {
  let authenticateTabs = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Signup
        </Link>
      </li>
    </>
  )

  let authenticatedOperations = null
  if (props.isAuth) {
    authenticatedOperations = (
      <>
        {/* <li className="nav-item active">
          <a className="nav-link" href="/#">
            Home <span className="sr-only">(current)</span>
          </a>
        </li> */}
        <li className="nav-item">
          <a className="nav-link" href="/#">
            Order
          </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="/#">
            Checkout
          </a>
        </li> */}
      </>
    )
  }

  let LogoutTab = (
    <li className="nav-item">
      <Link className="nav-link" to="#" onClick={props.logout}>
        <GoSignOut />
      </Link>
    </li>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/#">
        Joey's Pizza
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav NavBar d-flex justify-content-between w-100">
          {authenticatedOperations}
          {props.isAuth ? LogoutTab : authenticateTabs}
        </ul>
      </div>
    </nav>
  )
}

export default navbar

import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { GoSignOut } from 'react-icons/go'
import { FaPizzaSlice } from 'react-icons/fa'

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
          <a className="nav-link" href="/">
            Order
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/orders">
            History
          </a>
        </li>
        {props.isAdmin && (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                Dashboard
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/editMenu">
                Edit Menu
              </a>
            </li> */}
          </>
        )}
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark half-opacity Navbar">
      <a className="navbar-brand" href="/#">
        Joey's <FaPizzaSlice /> Pizza
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
        <ul className="navbar-nav NavBar d-flex">
          {authenticatedOperations}
          {props.isAuth ? LogoutTab : authenticateTabs}
        </ul>
      </div>
    </nav>
  )
}

export default navbar

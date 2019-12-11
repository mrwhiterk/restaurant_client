import React from 'react'

const miniCart = () => {
  return (
    <div className="MiniCart">
      <h4>Your Cart</h4>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Cras justo odio
          <span className="badge badge-primary badge-pill">1</span>
        </li>
      </ul>
    </div>
  )
}

export default miniCart

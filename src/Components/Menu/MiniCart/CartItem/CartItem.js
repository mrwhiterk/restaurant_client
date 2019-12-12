import React from 'react'

const cartItem = props => (
  <li className="list-group-item d-flex justify-content-between align-items-center">
    {props.name}
    <span className="badge badge-primary badge-pill">{props.quantity}</span>
    <div>$ {props.totalPrice.toFixed(2)}</div>
  </li>
)



export default cartItem;
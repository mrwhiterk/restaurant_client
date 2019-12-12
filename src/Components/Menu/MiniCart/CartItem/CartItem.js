import React from 'react'
import PropTypes from 'prop-types'

const cartItem = props => (
  <li className="list-group-item d-flex justify-content-between align-items-center">
    {props.name}
    <span className="badge badge-primary badge-pill">{props.quantity}</span>
    <div>$ {props.totalPrice.toFixed(2)}</div>
  </li>
)

cartItem.propTypes = {
  name: PropTypes.string,
  quantity: PropTypes.number,
  totalPrice: PropTypes.number
}

export default cartItem

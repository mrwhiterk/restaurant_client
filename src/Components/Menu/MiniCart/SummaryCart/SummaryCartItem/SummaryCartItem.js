import React from 'react'
import PropTypes from 'prop-types'


const summaryCartItem = props => (
  <li className="list-group-item d-flex justify-content-between align-items-center border-0">
    {props.name}
    <span
      className=""
      // onClick={() => props.handleSelectMenuItem(props.name, props.price, true)}
    >
      {props.quantity}
    </span>
    <div>$ {props.totalPrice.toFixed(2)}</div>

  </li>
)

summaryCartItem.propTypes = {
  name: PropTypes.string,
  quantity: PropTypes.number,
  totalPrice: PropTypes.number
}

export default summaryCartItem

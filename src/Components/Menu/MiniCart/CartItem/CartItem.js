import React from 'react'
import PropTypes from 'prop-types'
import { IoMdClose } from 'react-icons/io'

const cartItem = props => (
  <li className="list-group-item d-flex justify-content-between align-items-center">
    {props.name}
    <span
      className="badge badge-primary badge-pill"
      onClick={() => props.handleSelectMenuItem(props.name, props.price, true)}
    >
      {props.quantity}
    </span>
    <div>$ {props.totalPrice.toFixed(2)}</div>
    <IoMdClose onClick={e => props.renderCartModal(e, props.name)} />
  </li>
)

cartItem.propTypes = {
  name: PropTypes.string,
  quantity: PropTypes.number,
  totalPrice: PropTypes.number
}

export default cartItem

import React from 'react'

import CartItem from './CartItem/CartItem'

const miniCart = props => {
  let cartItems = props.currentOrder.map(item => (
    <CartItem
      key={item.name}
      name={item.name}
      quantity={item.quantity}
      totalPrice={item.totalPrice}
    />
  ))


  return (
    <div className="MiniCart">
      <h4>Your Cart</h4>
      <ul className="list-group">{cartItems}</ul>
    </div>
  )
}

export default miniCart

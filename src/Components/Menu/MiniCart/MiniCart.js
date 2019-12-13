import React from 'react'

import CartItem from './CartItem/CartItem'

const miniCart = props => {
  let cartItems = props.currentOrder.map(item => (
    <CartItem
      key={item.name}
      name={item.name}
      price={item.price}
      quantity={item.quantity}
      totalPrice={item.totalPrice}
      renderCartModal={props.renderCartModal}
      handleSelectMenuItem={props.handleSelectMenuItem}
    />
  ))

  return (
    <div className="MiniCart">
      <h4>Your Cart</h4>

      <ul className="list-group">
        {cartItems.length ? (
          cartItems
        ) : (
            <div className="text-center">
              <h6 className="border-top pt-2">- Cart Empty -</h6>

            </div>
          
          
        )}
      </ul>
    </div>
  )
}

export default miniCart

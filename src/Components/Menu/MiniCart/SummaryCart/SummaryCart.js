import React from 'react'
import SummaryCartItem from './SummaryCartItem/SummaryCartItem'

const summaryCart = props => {
  let cartItems = props.currentOrder.map(item => (
    <SummaryCartItem
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
      <ul className="list-group border-0">
        {cartItems}
      </ul>
    </div>
  )
}

export default summaryCart

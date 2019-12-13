import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import SummaryCart from '../../../Menu/MiniCart/SummaryCart/SummaryCart'

class CheckoutModal extends Component {
  render() {

    let [quantity, totalPrice] = this.props.currentOrder.reduce((acc, val) => {
      acc[0] += val.quantity
      acc[1] += val.totalPrice
      return acc;
    }, [0, 0])

    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Place Order Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you ready to place your order?
            <SummaryCart
              currentOrder={this.props.currentOrder}
              renderCartModal={this.props.renderCartModal}
              handleSelectMenuItem={this.props.handleSelectMenuItem}
            />
            <div className="list-group-item d-flex justify-content-end text-center pr-5 border-0">
              <div className="d-flex flex-column justify-content-center">
                <div>Count:</div>
                <div>Total:</div>
              </div>
              <div className="d-flex flex-column justify-content-center ml-2 text-left">
                <div>{quantity}</div>
                <div>${totalPrice.toFixed(2)}</div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="">
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.props.handleSubmit}>
              Place Order
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default CheckoutModal

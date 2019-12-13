import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import MiniCart from '../../../Menu/MiniCart/MiniCart'

class CheckoutModal extends Component {
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Place Order Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you ready to place your order?
            <MiniCart
              currentOrder={this.props.currentOrder}
              renderCartModal={this.props.renderCartModal}
              handleSelectMenuItem={this.props.handleSelectMenuItem}
            />
          </Modal.Body>
          <Modal.Footer>
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

export default CheckoutModal; 

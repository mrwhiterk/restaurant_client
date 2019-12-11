import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

class MenuModal extends Component {
  state = {
    quantity: 1
  }

  setQuantity = e => {
    this.setState({ quantity: e.target.value })
  }

  render() {
    let options = []

    for (let i = 2; i <= 10; i++) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      )
    }

    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              Do you want to add the following to your order:
            </div>
            <div className="col-8 d-flex text-center align-items-center justify-content-between">
              <div>{this.props.itemName}</div>
              <div>$ {this.props.itemPrice.toFixed(2)}</div>
            </div>
            <div className="col-4">
              <div class="input-group">
                <select
                  class="custom-select"
                  id="inputGroupSelect04"
                  onChange={this.setQuantity}
                >
                  <option>0</option>
                  <option selected>1</option>
                  {options}
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between row w-100 align-items-center">
            <div>
              Total: $ {(this.props.itemPrice * this.state.quantity).toFixed(2)}
            </div>
            <div>
              <Button variant="secondary" onClick={this.props.handleClose}>
                Close
              </Button>

              {this.state.quantity > 0 && (
                <Button variant="success" onClick={this.props.handleSubmit}>
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default MenuModal

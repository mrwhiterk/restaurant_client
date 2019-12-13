import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class MenuModal extends Component {
  state = {
    quantity: this.props.currentItemEditMode
      ? this.props.currentItemEditMode.quantity
      : 1
  }

  setQuantity = e => {
    this.setState({ quantity: e.target.value })
  }

  render() {
    console.log(this.props.currentItemEditMode)
    let options = []

    for (let i = 1; i <= 10; i++) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      )
    }
    console.log(this.props.itemPrice)
    console.log(this.state.quantity)

    let totalPrice = this.props.itemPrice * this.state.quantity

    // console.log(this.props.currentItemEditMode)

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
              <div className="input-group">
                <select
                  className="custom-select"
                  id="inputGroupSelect04"
                  onChange={this.setQuantity}
                >
                  <option>0</option>
                  <option selected>
                    {this.props.currentItemEditMode
                      ? this.props.currentItemEditMode.quantity + '(current)'
                      : 1}
                  </option>
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
                <Button
                  variant="success"
                  onClick={() => {
                    this.props.handleSubmit(
                      +this.state.quantity,
                      totalPrice,
                      this.props.currentItemEditMode
                    )
                    this.setState({ quantity: 1 })
                  }}
                >
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

MenuModal.propTypes = {
  itemPrice: PropTypes.number,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  itemName: PropTypes.string
}

export default MenuModal

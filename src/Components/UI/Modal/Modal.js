import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class MenuModal extends Component {
  state = {
    quantity: this.props.currentItemEditMode
      ? +this.props.currentItemEditMode.quantity
      : 1
  }

  setQuantity = e => {
    this.setState({ quantity: +e.target.value })
  }

  render() {
    let options = []


    for (let i = 1; i <= 10; i++) {
      options.push(
        <option value={+i} key={i}>
          {i}
        </option>
      )
    }

    let totalPrice = this.props.itemPrice * this.state.quantity

    return (
      <Modal
        show={this.props.show}
        onHide={() => {
          this.props.handleClose()
          this.setState({ quantity: 1 })
        }}
      >
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
                  defaultValue={
                    this.props.currentItemEditMode
                      ? +this.props.currentItemEditMode.quantity
                      : 1
                  }
                >
                  

                  {options}
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between row w-100 align-items-center">
            <div>Total: $ {totalPrice.toFixed(2)}</div>
            <div>
              <Button
                variant="secondary"
                onClick={() => {
                  this.props.handleClose()
                  this.setState({ quantity: 1 })
                }}
              >
                Close
              </Button>

              {this.state.quantity > 0 && (
                <Button
                  variant="success"
                  onClick={() => {
                    this.props.handleSubmit(
                      this.state.quantity,
                      totalPrice,
                      this.props.currentItemEditMode
                    )

                    this.setState({ quantity: 1 })
                  }}
                >
                  {this.props.currentItemEditMode
                    ? 'Update Cart'
                    : 'Add to Cart'}
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

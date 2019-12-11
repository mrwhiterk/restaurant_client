import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const modal = props => {
  let options = []

  for (let i = 2; i <= 10; i++) {
    options.push(<option value={i}>{i}</option>)
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add to Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            Do you want to add the following to your order:
          </div>
          <div className="col-10 d-flex text-center align-items-center justify-content-between">
            <div>{props.itemName}</div> 
            <div>$ {props.itemPrice.toFixed(2)}</div>
          </div>
          <div className="col-2">
            <div class="input-group">
              <select class="custom-select" id="inputGroupSelect04">
                <option selected>1</option>
                {options}
              </select>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={props.handleSubmit}>
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default modal

import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const deleteCartItemModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          Are you sure you want to remove {props.cartItemName}?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>Close</Button>

        <Button variant="danger" onClick={(e) => props.deleteCartItem(e, props.cartItemName)}>Remove from order</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default deleteCartItemModal

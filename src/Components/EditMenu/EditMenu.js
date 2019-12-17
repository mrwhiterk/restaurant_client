import React, { Component } from 'react'
import { getMenu, addMenuItem } from '../../api/api'
import { Spinner, Modal, Button, Form } from 'react-bootstrap'
import { IoMdAddCircleOutline } from 'react-icons/io'

import './EditMenu.css'

class EditMenu extends Component {
  state = {
    menu: null,
    show: false,
    name: '',
    price: '',
    category: 'Pies'
  }

  async componentDidMount() {
    this.loadMenu()
  }

  async loadMenu() {
    let menu = await getMenu()
    this.setState({ menu })
  }

  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()

    await addMenuItem(this.state.menu)
    // this.loadMenu()
  }

  render() {
    let orderItems = ['Pies', 'Pasta', 'Drinks']
    let menuDisplay = []

    console.log(this.state)

    if (this.state.menu) {
      menuDisplay = orderItems.map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            <h4>{item}</h4>
            <hr />
            {/* {console.log(this.state.menu[item])} */}
            {this.state.menu[item].map(item => {
              return (
                <li
                  className="list-group-item border-0 MenuItem d-flex justify-content-between"
                  key={item.name}
                  onClick={() =>
                    this.handleSelectMenuItem(item.name, item.price)
                  }
                >
                  {item.name}

                  <span>$ {item.price.toFixed(2)}</span>
                </li>
              )
            })}
          </React.Fragment>
        )
      })
    }
    return (
      <div className="EditMenu">
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Menu Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.category}
                  onChange={this.handleChange}
                  name="category"
                >
                  {orderItems.map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="name"
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  placeholder="price"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <h2 className="offset-2 col-8 d-flex justify-content-between mt-2">
          Edit Menu{' '}
          <span id="add">
            <IoMdAddCircleOutline onClick={this.handleShow} />
          </span>
        </h2>

        <div className="row">
          {this.state.menu ? (
            <div className="col-8 offset-2">{menuDisplay}</div>
          ) : (
            <div className="col-8 spinner-2">
              <Spinner animation="grow" role="status" variant="danger">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default EditMenu

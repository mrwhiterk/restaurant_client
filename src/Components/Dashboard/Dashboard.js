import React, { Component } from 'react'

import {
  getAllOrders,
  cancelOrder,
  resumeOrder,
  completeOrder,
  markOrderIncomplete,
  archive,
  activate
} from '../../api/api'

import './Dashboard.css'

import SummaryCart from '../Menu/MiniCart/SummaryCart/SummaryCart'

import { Tab, Row, Col, Button, ListGroup, Dropdown } from 'react-bootstrap'

import { GiHamburgerMenu } from 'react-icons/gi'

class Order extends Component {
  state = {
    orders: [],
    ordersDisplayed: []
  }

  componentDidMount() {
    this.setOrders()
  }

  setOrders = async () => {
    try {
      let result = await getAllOrders()
      this.setState({
        orders: result.data,
        ordersDisplayed: result.data.filter(x => x.isActive)
      })
    } catch (e) {
      console.log(e)
    }
  }

  setAllOrders = () => {
    this.setState(prevState => ({
      ordersDisplayed: prevState.orders
    }))
  }

  setActiveOrders = () => {
    this.setOrders()
    this.setState(prevState => ({
      ordersDisplayed: prevState.orders.filter(x => x.isActive)
    }))
  }

  setArchivedOrders = async () => {
    this.setState(prevState => ({
      ordersDisplayed: prevState.orders.filter(x => !x.isActive)
    }))
  }

  render() {
    let activeOrders = this.state.orders.filter(x => x.isActive).length
    let archivedOrders = this.state.orders.filter(x => !x.isActive).length

    let content = (
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
            <ListGroup>
              {this.state.ordersDisplayed.map((item, i) => (
                <ListGroup.Item key={i} action href={`#link${i}`}>
                  <div>{item.userId.email}</div>

                  <span>
                    {!item.isActive
                      ? 'Archived'
                      : item.completed
                      ? 'Pickup'
                      : item.submitted
                      ? 'In work'
                      : 'cancelled'}
                  </span>
                  <div>{new Date(item.createdAt).toDateString()}</div>
                  <div>{new Date(item.createdAt).toLocaleTimeString()}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {this.state.ordersDisplayed.map((item, i) => {
                return (
                  <Tab.Pane
                    eventKey={`#link${i}`}
                    key={i}
                    className="border rounded p-2"
                  >
                    <div>
                      {item.isActive ? (
                        item.completed ? (
                          <div className="alert alert-success" role="alert">
                            Ready for Pickup
                          </div>
                        ) : item.submitted ? (
                          <div className="alert alert-warning" role="alert">
                            In Work
                          </div>
                        ) : (
                          <div className="alert alert-danger" role="alert">
                            Cancelled
                          </div>
                        )
                      ) : (
                        <div className="alert alert-dark" role="alert">
                          Archived
                        </div>
                      )}

                      <div>
                        <SummaryCart currentOrder={item.content} />
                        <div className="list-group-item d-flex justify-content-between align-items-center text-center pr-5 border-0">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="default"
                              id="dropdown-basic"
                            >
                              <GiHamburgerMenu />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {!item.completed ? (
                                item.submitted ? (
                                  <>
                                    <Dropdown.Item
                                      onClick={cancelOrder.bind(this, item._id)}
                                    >
                                      Cancel
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={completeOrder.bind(
                                        this,
                                        item._id
                                      )}
                                    >
                                      Complete
                                    </Dropdown.Item>
                                  </>
                                ) : (
                                  <Dropdown.Item
                                    onClick={resumeOrder.bind(this, item._id)}
                                  >
                                    Resume
                                  </Dropdown.Item>
                                )
                              ) : (
                                <Dropdown.Item
                                  onClick={markOrderIncomplete.bind(
                                    this,
                                    item._id
                                  )}
                                >
                                  Mark Incomplete
                                </Dropdown.Item>
                              )}
                              {item.isActive ? (
                                <Dropdown.Item
                                  onClick={archive.bind(this, item._id)}
                                >
                                  Archive
                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item
                                  onClick={activate.bind(this, item._id)}
                                >
                                  Set Active
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>

                          <div className="d-flex">
                            <div className="d-flex flex-column justify-content-center">
                              <div>Count:</div>
                              <div>Total:</div>
                            </div>
                            <div className="d-flex flex-column justify-content-center ml-2 text-left">
                              <div>
                                {item.content.reduce(
                                  (acc, el) => acc + el.quantity,
                                  0
                                )}
                              </div>
                              <div>
                                $
                                {item.content
                                  .reduce((acc, el) => acc + el.totalPrice, 0)
                                  .toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                )
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )

    if (!this.state.orders.length) {
      content = <h4 className="text-center">-- No orders yet --</h4>
    }

    return (
      <div className="Orders">
        <div className="text-center">
          <Dropdown className="mb-2">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={this.setAllOrders}
                className="d-flex justify-content-between"
              >
                <>
                  <div>All</div> <div>{this.state.orders.length}</div>
                </>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={this.setActiveOrders}
                className="d-flex justify-content-between"
              >
                <>
                  <div>Active</div> <div>{activeOrders}</div>
                </>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={this.setArchivedOrders}
                className="d-flex justify-content-between"
              >
                <>
                  <div>Archived</div> <div>{archivedOrders}</div>
                </>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {content}
      </div>
    )
  }
}

export default Order

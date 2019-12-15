import React, { Component } from 'react'

import { getUserOrders, cancelOrder } from '../../api/api'
import SummaryCart from '../Menu/MiniCart/SummaryCart/SummaryCart'
import { Tab, Row, Col, Button, ListGroup } from 'react-bootstrap'
import './Orders.css'

class Order extends Component {
  state = {
    orders: []
  }

  componentDidMount() {
    this.setOrders()
  }

  async setOrders() {
    try {
      let result = await getUserOrders()
      this.setState({ orders: result.data })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    let content = (
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
            <ListGroup>
              {this.state.orders.map((item, i) => (
                <ListGroup.Item key={i} action href={`#link${i}`}>
                  Order:{' '}
                  <span>{item.completed
                    ? 'done'
                    : item.submitted
                    ? 'In work'
                    : 'cancelled'}</span>
                  <div>{new Date(item.createdAt).toDateString()}</div>
                  <div>{new Date(item.createdAt).toLocaleTimeString()}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {this.state.orders.map((item, i) => {
                return (
                  <Tab.Pane
                    eventKey={`#link${i}`}
                    key={i}
                    className="border rounded p-2"
                  >
                    <div>
                      {item.completed ? (
                        <div className="alert alert-success" role="alert">
                          Done
                        </div>
                      ) : item.submitted ? (
                        <div className="alert alert-warning" role="alert">
                          In Work
                        </div>
                      ) : (
                        <div className="alert alert-danger" role="alert">
                          Cancelled
                        </div>
                      )}
                      <div>
                        <SummaryCart currentOrder={item.content} />
                        <div className="list-group-item d-flex justify-content-between align-items-center text-center pr-5 border-0">
                          {item.submitted ? (
                            <Button
                              variant="danger"
                              onClick={cancelOrder.bind(this, item._id)}
                            >
                              Cancel Order
                            </Button>
                          ) : <div></div>}

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

    return <div className="Orders">{content}</div>
  }
}

export default Order

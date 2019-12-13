import React, { Component } from 'react'

import { getUserOrders } from '../../api/api'
import SummaryCart from '../Menu/MiniCart/SummaryCart/SummaryCart'

import { Tab, Row, Col, ListGroup } from 'react-bootstrap'
import './Orders.css'

class Order extends Component {
  state = {
    orders: []
  }

  async componentDidMount() {
    // get all user orders
    try {
      let result = await getUserOrders()
      this.setState({ orders: result.data })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className="Orders">
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup>
                {this.state.orders.map((item, i) => (
                  <ListGroup.Item key={item.id} action href={`#link${i}`}>
                    Order:
                    <div>{new Date(item.createdAt).toDateString()}</div>
                    <div>{new Date(item.createdAt).toLocaleTimeString()}</div>
                  </ListGroup.Item>
                ))}
                {/* <ListGroup.Item action href="#link2">
                  Link 2
                </ListGroup.Item> */}
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
                          <div class="alert alert-success" role="alert">
                            Ready for Pickup
                          </div>
                        ) : (
                          <div class="alert alert-warning" role="alert">
                            In Work
                          </div>
                        )}
                        <div>
                          <SummaryCart currentOrder={item.content} />
                          <div className="list-group-item d-flex justify-content-end text-center pr-5 border-0">
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
                                  .reduce((acc, el) => acc + el.price, 0)
                                  .toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                  )
                })}
                {/* <Tab.Pane eventKey="#link2">
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Pariatur ipsam quos officiis, rem nemo repudiandae aut iste
                    autem, ab dignissimos vero eos dicta delectus qui sed ut
                    impedit doloribus animi?
                  </div>
                </Tab.Pane> */}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}

export default Order

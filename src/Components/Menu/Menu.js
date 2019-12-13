import React, { Component } from 'react'
import './Menu.css'

import MiniCart from './MiniCart/MiniCart'
import Modal from '../UI/Modal/Modal'
import { Button } from 'react-bootstrap'

import { Axios } from '../../api/Axios'

import { apiAuth, axiosConfig } from '../../api/api'
import DeleteCartItemModal from '../UI/Modal/DeleteCartItemModal/DeleteCartItemModal'
import CheckoutModal from '../UI/Modal/CheckoutModal/CheckoutModal'

class Menu extends Component {
  state = {
    currentOrder: [],
    show: false,
    menu: {
      Pies: [
        {
          name: 'Ol Faithful',
          price: 9.0
        },
        {
          name: 'Meat Lover',
          price: 10.0
        },
        {
          name: 'Veggie Supreme',
          price: 8.0
        }
      ],

      Pasta: [
        {
          name: 'Spaghetti',
          price: 7.5
        },
        {
          name: 'Alfredo',
          price: 10.0
        },
        {
          name: 'Bologonese',
          price: 9.5
        }
      ],

      Drinks: [
        {
          name: 'Coke',
          price: 2.5
        },
        {
          name: 'Sprite',
          price: 2.0
        },
        {
          name: 'Lemonade',
          price: 1.5
        }
      ]
    },
    currentMenuItem: null,
    currentDeleteItem: null,
    showDeleteModal: false,
    currentItemEditMode: null,
    showCheckoutModal: false
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false, currentItemEditMode: null })
  }

  handleDeleteModalClose = () => {
    this.setState({ showDeleteModal: false, currentDeleteItem: null })
  }

  handleCheckoutModalClose = () => {
    this.setState({ showCheckoutModal: false })
  }

  handleCheckoutSubmit = () => {
    console.log('handle checkout submit')
  }

  handleSelectMenuItem = (name, price, isEditing) => {
    if (isEditing) {
      let idx = this.state.currentOrder.findIndex(item => item.name === name)
      let currentOrderItem = [...this.state.currentOrder][idx]

      console.log(currentOrderItem)

      this.setState(
        {
          currentMenuItem: {
            name,
            price
          },
          currentItemEditMode: currentOrderItem
        },
        () => {
          this.handleShow()
        }
      )
    } else {
      this.setState(
        {
          currentMenuItem: {
            name,
            price
          },
          currentItemEditMode: null
        },
        () => {
          this.handleShow()
        }
      )
    }
  }

  handleSubmit = (quantity, totalPrice, editObj) => {
    this.handleClose()

    let data = {
      ...this.state.currentMenuItem,
      quantity,
      totalPrice
    }

    let existingItemIdx = this.state.currentOrder.findIndex(item => {
      return item.name === data.name
    })

    if (existingItemIdx > -1) {
      this.setState(
        prevState => {
          let newCurrentOrder = [...this.state.currentOrder]
          let currentItemObj = { ...this.state.currentOrder[existingItemIdx] }

          if (editObj) {
            currentItemObj.quantity = +data.quantity
            currentItemObj.totalPrice = +data.totalPrice
          } else {
            currentItemObj.quantity += +data.quantity
            currentItemObj.totalPrice += +data.totalPrice
          }

          newCurrentOrder[existingItemIdx] = currentItemObj

          return {
            currentOrder: newCurrentOrder,
            currentMenuItem: null
          }
        },
        () => {
          this.saveOrderInProgress()
          this.setState({ currentItemEditMode: null })
        }
      )
    } else {
      this.setState(
        prevState => ({
          currentOrder: [...prevState.currentOrder, data]
        }),
        () => {
          this.saveOrderInProgress()
        }
      )
    }
  }

  saveOrderInProgress = async () => {
    let data = apiAuth()

    if (!data.id) return

    try {
      let result = await Axios.post(
        '/api/users/saveOrder',
        this.state.currentOrder,
        axiosConfig
      )
    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount = async () => {
    let data = apiAuth()

    if (!data.id) return

    try {
      let result = await Axios.get('/api/users/getOrder', axiosConfig)

      this.setState({ currentOrder: result.data })
    } catch (e) {
      console.log(e)
    }
  }

  deleteCartItem = async (e, name) => {
    let data = apiAuth()
    if (!data.id) return

    try {
      let result = await Axios.delete(
        `/api/users/orderItem/${name}`,
        axiosConfig
      )

      this.setState({
        currentOrder: result.data.currentOrder,
        showDeleteModal: false,
        currentDeleteItem: null
      })
    } catch (e) {
      console.log(e)
    }
  }

  renderCartModal = async (e, name) => {
    this.setState({ currentDeleteItem: name }, () => {
      this.setState({ showDeleteModal: true })
    })
  }

  orderCheckout = () => {
    this.setState({ showCheckoutModal: true })
  }

  render() {
    let menuList = []
    for (const key in this.state.menu) {
      if (this.state.menu.hasOwnProperty(key)) {
        const menuSectionTitle = key

        menuList.push(
          <React.Fragment key={key}>
            <h4>{menuSectionTitle}</h4>
            <hr />
            {this.state.menu[menuSectionTitle].map(item => {
              return (
                <li
                  className="list-group-item border-0 MenuItem"
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
      }
    }

    return (
      <div className="Menu">
        {this.state.currentMenuItem && !this.state.currentItemEditMode ? (
          <Modal
            handleClose={this.handleClose}
            handleSubmit={this.handleSubmit}
            show={this.state.show}
            itemName={this.state.currentMenuItem.name}
            itemPrice={this.state.currentMenuItem.price}
          />
        ) : null}

        {this.state.currentMenuItem && this.state.currentItemEditMode ? (
          <Modal
            handleClose={this.handleClose}
            handleSubmit={this.handleSubmit}
            show={this.state.show}
            itemName={this.state.currentMenuItem.name}
            itemPrice={this.state.currentMenuItem.price}
            currentItemEditMode={this.state.currentItemEditMode}
          />
        ) : null}

        {this.state.showCheckoutModal && (
          <CheckoutModal
            show={this.state.showCheckoutModal}
            handleClose={this.handleCheckoutModalClose}
            handleSubmit={this.handleCheckoutSubmit}
            currentOrder={this.state.currentOrder}
            renderCartModal={this.renderCartModal}
            handleSelectMenuItem={this.handleSelectMenuItem}
          />
        )}

        {this.state.showDeleteModal ? (
          <DeleteCartItemModal
            show={this.state.showDeleteModal}
            title="Delete Cart Item"
            cartItemName={this.state.currentDeleteItem}
            deleteCartItem={this.deleteCartItem}
            handleClose={this.handleDeleteModalClose}
          />
        ) : null}

        <div className="row">
          <div className="col-8">{menuList}</div>

          <div className="col-4 border-left d-flex flex-column justify-content-between">
            <div>
              <h4>Your Cart</h4>
              <MiniCart
                currentOrder={this.state.currentOrder}
                renderCartModal={this.renderCartModal}
                handleSelectMenuItem={this.handleSelectMenuItem}
              />
            </div>
            {this.state.currentOrder.length ? <Button variant="outline-primary" onClick={this.orderCheckout}>
              Place Order
            </Button> : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Menu

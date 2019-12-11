import React, { Component } from 'react'
import './Menu.css'

import MiniCart from './MiniCart/MiniCart'
import { Button } from 'react-bootstrap'
import Modal from '../UI/Modal/Modal'

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
    currentMenuItem: null
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleSelectMenuItem = (name, price) => {
    this.setState(
      {
        currentMenuItem: {
          name,
          price
        }
      },
      () => {
        this.handleShow()
      }
    )
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
                  className="list-group-item border-0"
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
        
        {this.state.currentMenuItem ? (
          <Modal
            handleClose={this.handleClose}
            show={this.state.show}
            itemName={this.state.currentMenuItem.name}
            itemPrice={this.state.currentMenuItem.price}
          />
        ) : null}

        <div className="row">
          <div className="col-8">{menuList}</div>

          <div className="col-4 border-left">
            <MiniCart />
          </div>
        </div>
      </div>
    )
  }
}

export default Menu

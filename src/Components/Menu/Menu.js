import React, { Component } from 'react'
import './Menu.css'

import MiniCart from './MiniCart/MiniCart'

class Menu extends Component {
  state = {
    currentOrder: []
  }

  render() {
    return (
      <div className="Menu">
        <div className="row">
          <div className="col-8">
            <h4>Signature Pies</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Ol Faithful<span>9.00</span>
              </li>
              <li className="list-group-item">
                Meat Lover<span>10.00</span>
              </li>
              <li className="list-group-item">
                Veggie Supreme<span>8.00</span>
              </li>
            </ul>
            <br />
            <h4>Pasta</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Spaghetti<span>7.50</span>
              </li>
              <li className="list-group-item">
                Alfredo<span>10.00</span>
              </li>
              <li className="list-group-item">
                Bologonese<span>9.50</span>
              </li>
            </ul>
            <br />
            <h4>Drinks</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Coke<span>2.50</span>
              </li>
              <li className="list-group-item">
                Sprite<span>2.00</span>
              </li>
              <li className="list-group-item">
                Lemonade<span>1.50</span>
              </li>
            </ul>
          </div>

          <div className="col-4">
            <MiniCart />
          </div>
        </div>
      </div>
    )
  }
}

export default Menu

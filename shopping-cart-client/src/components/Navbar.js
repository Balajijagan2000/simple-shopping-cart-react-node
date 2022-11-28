import React, { useContext } from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import ShoppingContext from '../context/ShoppingContext'
function Navbar() {
  const {cart} = useContext(ShoppingContext)
  return (
    <header>

        <h2>Shopping Cart</h2>
        <div className="cart-icon-box">
          <FaShoppingCart className="cart-icon" />
          <div className="badge">{cart.length}</div>
        
        </div>

    </header>
  )
}

export default Navbar
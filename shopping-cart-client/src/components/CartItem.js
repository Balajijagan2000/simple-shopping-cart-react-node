import React, { useContext } from 'react'
import {FaTrash} from 'react-icons/fa'
import ShoppingContext from '../context/ShoppingContext'
function CartItem({item}) {
    const {removeCartItem} = useContext(ShoppingContext)
  return (
    <div className="cart-item">
        <h3>{item.name}</h3>
        <FaTrash onClick={() => removeCartItem(item.id)}/>
    </div>
  )
}

export default CartItem
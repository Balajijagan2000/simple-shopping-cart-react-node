import React, { useContext } from 'react'
import ShoppingContext from '../context/ShoppingContext'
import CartItem from './CartItem'
function Cart() {
    const {cart} = useContext(ShoppingContext)
  return (
    <div className="cart">
        <h2>Cart</h2>
        {cart.length !== 0 ? cart.map((item) => {
            return <CartItem item={item} key={item.id} />
        })
        :
        <h4>No items</h4>
      }
    </div>
  )
}

export default Cart
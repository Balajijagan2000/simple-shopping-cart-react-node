import React,{useContext} from 'react'
import ShoppingContext from '../context/ShoppingContext'
function Product({product}) {
  const {addCartItems} = useContext(ShoppingContext)
  return (
    <div className="card">
        <img src={product.url} alt={product.name} />
        <div className="card-desc">
            <p>{product.name}</p>
            <p>({product.type})</p>
            <p>Rs.{product.price}</p>
        </div>
        <button onClick={() => addCartItems(product)}>Add to card</button>
    </div>
  )
}

export default Product
import React from 'react'
import {useContext} from 'react'
import Product from './Product'
import ShoppingContext from '../context/ShoppingContext'
import AddProduct from './AddProduct'

function Products() {


    const {products} = useContext(ShoppingContext)




  return (
    <div className="products-container">
      <AddProduct />
        {
            products.map((product) => {
                return <Product product={product} key={product.id}  />
            })
        }
    </div>
  )
}

export default Products
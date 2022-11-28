import React,{useContext} from 'react'
import ShoppingContext from '../context/ShoppingContext'
function AddProduct() {

    const {addProduct} = useContext(ShoppingContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        addProduct(formData)
        e.target.reset()
    }
  return (
    <div className="add-product">

        <form className="product-form" onSubmit={handleSubmit}>
            <input type="text" required name="name" id="name" placeholder="product name" />
            <input type="text" required name="type" id="name" placeholder="product type" />
            <input type="text" required name="price" id="price" placeholder="product price" />
            <label>Product Image</label>
            <input type="file" name="image" id="image" placeholder="upload product image" />
            <input type="submit" />
        </form>
    </div>
  )
}

export default AddProduct
import { createContext,useEffect,useState} from "react";

const ShoppingContext = createContext()

export const ShoppingContextProvider = ({children}) => {
    const [products,setProducts] = useState([])
    const [cart,setCart] = useState([])

    const fetchProducts = () => {
      fetch('http://localhost:3500/products')
      .then(res => res.json())
      .then(data => setProducts([...data]))
    }
    const fetchCartItems = () => {
      fetch('http://localhost:3500/cart')
      .then(res => res.json())
      .then(data => setCart(data))
    }
    const addProduct = (formdata) => {
      
      fetch('http://localhost:3500/products',
      {method:'POST',body:formdata})
        .then(res => {
          if(res.status === 200) {
            return res.json()
          } else {
            alert('Server error')
            return;
          }
        })
        .then(responsedata => {
      
          if(responsedata) {
            fetchProducts()
            
          }
          
        })
    }


    const addCartItems = (item) => {
      fetch('http://localhost:3500/cart',
      {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(item)})
        .then(res => {
          if(res.status === 200) {
            return res.json()
          } else {
            alert('Item already in cart')
            return;
          }
        })
        .then(data => {
          
          if(data) {setCart([...cart,data.data])}
          
        })
    }
    const removeCartItem = (id) => {
      fetch('http://localhost:3500/cart/'+id,
      {method:'DELETE'})
        .then(res => {
          if(res.status === 200) {
            const newCart = cart.filter((item) => {
              return id !== item.id
            })
            
            setCart([...newCart])
          } else {
            return;
          }
        })
        
    }

      useEffect(() => {
        fetchProducts()
        fetchCartItems()
      },[])
    
    return (
        <ShoppingContext.Provider value={{products,cart,setCart,addCartItems,removeCartItem,addProduct}}>
            {children}
        </ShoppingContext.Provider>
    )
}

export default ShoppingContext
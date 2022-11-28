import './App.css';
import Cart from './components/Cart';
import Navbar from './components/Navbar'
import Products from './components/Products';
import {ShoppingContextProvider} from './context/ShoppingContext'

function App() {
  return (
    <>
      <ShoppingContextProvider>
        <Navbar />
        <div className="container">
          <Products />
          <Cart />
        </div>
      </ShoppingContextProvider>
      
    </>
  );
}

export default App;

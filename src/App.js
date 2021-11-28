import { useState,useEffect } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import {commerce} from './lib/commerce'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './components/Checkout/Checkout';

function App() {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [customerDetails, setCustomerDetails] = useState({firstName:'',lastName:''})

  const fetchProducts = async () =>{
    try {
     const {data} = await commerce.products.list();
     setProducts(data)
    } catch (error) {
      console.log(error);
    }
    
  }

  const fetchCart = async ()=>{
    try {
      const data = await commerce.cart.retrieve()
      setCart(data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddToCart = async (productId,quantity)=>{
    try {
      const response = await commerce.cart.add(productId,quantity)
      setCart(response.cart)
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateCartQnt = async (productId,quantity)=>{
    try {
      const response = await commerce.cart.update(productId,{quantity})
      setCart(response.cart)
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveFromCart = async (productId)=>{
    try {
      const response = await commerce.cart.remove(productId)
      setCart(response.cart)
    } catch (error) {
      console.log(error);
    }
  }

  const handleEmptyCart = async ()=>{
    try {
      const response = await commerce.cart.empty()
      setCart(response.cart)
    } catch (error) {
      console.log(error);
    }
  }

  const refreshCart = async () =>{
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId,newOrder)=>{
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder)
      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setOrder(customerDetails)
      refreshCart()
      console.log(error);
    }

  }
  

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])
  console.log(products);
  console.log("Cart is ",cart);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact >
            <Navbar cart={cart} />
            {/* <Products products={products} onAddToCart={handleAddToCart}/> */}
            {/* Redux */}
            <Products onAddToCart={handleAddToCart}/>
          </Route>
          <Route exact path="/cart">
            <Navbar cart={cart} />
            <Cart cart={cart} handleUpdateCartQnt={handleUpdateCartQnt} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart}/>
          </Route>
          <Route exact path="/checkout">
            <Navbar cart={cart} />
            <Checkout cart={cart} handleCaptureCheckout={handleCaptureCheckout} order={order} setCustomerDetails={setCustomerDetails} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

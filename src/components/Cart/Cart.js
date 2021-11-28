import React from 'react'
import {Typography,Grid} from '@material-ui/core'
import "./Cart.css"
import {Link,useHistory} from 'react-router-dom'
import Product from '../Product/Product';

function Cart({cart,handleUpdateCartQnt,handleRemoveFromCart,handleEmptyCart}) {
    const history = useHistory()

    if(!cart.line_items) return 'Loading....'
    
    return (
        <div style={{marginTop:'60px'}} >
            {cart?.line_items.length===0?(
            <Typography variant="subtitle1">You have no items in your shopping cart,<Link to="/"> start adding some!</Link></Typography>
            ):
            <div className="cart__cnt">
                <p>Your Shopping Cart</p>
                <Grid container justifyContent="center" style={{padding:'10px'}}>
                    {
                        cart.line_items.map((item)=>(
                            <Grid key={item.id} xs={12} sm={6} md={4} lg={3} style={{margin:'10px'}} >
                                <Product product={item} isCart={true} handleUpdateCartQnt={handleUpdateCartQnt} handleRemoveFromCart={handleRemoveFromCart} />
                            </Grid>
                        ))
                    }

                </Grid>
                <div className="cardDetails">
                    <p>Subtotal: {cart.subtotal.formatted_with_symbol}</p>
                    <div>
                        <button className="emptyBtn" onClick={()=>handleEmptyCart()}>Empty Cart</button>
                        <button className="checkoutBtn" onClick={()=>history.push('/checkout')}>Checkout</button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Cart

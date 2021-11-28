import React from 'react'
import './Product.css'
import {Typography,IconButton} from '@material-ui/core'
import {AddShoppingCart,Delete} from '@material-ui/icons'


function Product({product,onAddToCart,isCart,handleUpdateCartQnt,handleRemoveFromCart}) {


    return (
        <div className="product">
            <div className="product__img">
                <img src={product.image.url} alt="" srcset="" />
            </div>
            <div>
                <div className="product__details">
                    <h5>{product.name}</h5>
                    <h5>{product.price.formatted_with_code}</h5>
                </div>
                <Typography style={{height:"50px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}} dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
            </div>
           <div className="product__action">
               {!isCart?
               <IconButton aria-label="Add to Cart" onClick={()=>onAddToCart(product.id,1)}>
               <AddShoppingCart />
              </IconButton>
              :
              <div className="cart">
                <div className="cart__action">
                    <button onClick={()=>handleUpdateCartQnt(product.id,product.quantity-1)}>-</button>
                    <p>{product.quantity}</p>
                    <button onClick={()=>handleUpdateCartQnt(product.id,product.quantity+1)}>+</button>
                </div>
                <IconButton aria-label="Delete from Cart" onClick={()=>handleRemoveFromCart(product.id)}>
                    <Delete />
                </IconButton>
               </div>

            }   
               
           </div>
            
            
        </div>
    )
}

export default Product

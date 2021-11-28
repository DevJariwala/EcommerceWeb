import React,{useEffect} from 'react'
import "./Products.css"
import {Grid} from '@material-ui/core'
import Product from '../Product/Product'

// --------------------------------
import { commerce } from '../../lib/commerce'
import { fetchAllProducts } from '../../redux/actions/productAction'
import { useDispatch,useSelector} from 'react-redux'



function Products({products,onAddToCart}) {

    // ------------------------------------------------------

    const dispatch = useDispatch()
    const allProducts = useSelector((state)=>state.allProducts.products)
    const fetchProducts = async () =>{
        try {
         const {data} = await commerce.products.list();
         dispatch(fetchAllProducts(data))
        } catch (error) {
          console.log(error);
        }
        
      }

      useEffect(() => {
        fetchProducts()
      }, [])

      console.log("From Redux all product is ",allProducts);

    //   ----------------------------------------------------
    return (
        <div className="products">
            <Grid container justify="center" style={{padding:'10px'}}>
               
                {
                    allProducts.map((item)=>(
                        <Grid key={item.id} xs={12} sm={6} md={4} lg={3} style={{margin:'10px'}} >
                            <Product product={item} onAddToCart={onAddToCart} />
                        </Grid>
                    ))
                }

            </Grid>
            
        </div>
    )
}

export default Products

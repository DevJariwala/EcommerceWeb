import React from 'react'
import './PaymentForm.css'
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {Typography,List,ListItem,ListItemText,Button} from '@material-ui/core'

const stripePromise = loadStripe('pk_test_51JLSIQSIS3yDsbSRepElQLHblFMwQEXgiC38RHAhhNLW0ieea875WIyuBPs0KsHDdfu25gU24EupLm8xquZFjUGZ00ItlxCMFn')

function PaymentForm({shippingData,checkOutToken,back,handleCaptureCheckout,nextStep}) {

    const handleSubmit= async (e,elements,stripe)=>{
        e.preventDefault()
        if(!stripe || !elements) return
        const cardElement = elements.getElement(CardElement)
        const {error,paymentMethod} = await stripe.createPaymentMethod({type:'card',card:cardElement})

        if(error){
            console.log(error);
        }else{
            const orderData = {
                line_items:checkOutToken.live.line_items,
                customer:{
                    firstname:shippingData.firstName,
                    lastname:shippingData.lastName,
                    email:shippingData.email
                },
                shipping:{
                    name:'Primary',
                    street:shippingData.address,
                    town_city:shippingData.city,
                    county_state:shippingData.shippingSubdivision,
                    postal_zip_code:shippingData.zip,
                    country:shippingData.shippingCountry
                },
                fulfillment:{
                    shipping_method:shippingData.shippingOption
                },
                payment:{
                    gateway:'stripe',
                    stripe:{
                        payment_method_id:paymentMethod.id
                    }
                }
            }
            handleCaptureCheckout(checkOutToken.id,orderData)
            nextStep()
        }
    }

    return (
        <div className="paymentform">
            <Typography variant="h6" gutterBottom>Order summary</Typography>
            <List disablePadding>
                {
                    checkOutToken.live.line_items.map((product)=>(
                        <ListItem style={{padding:'10px 0'}} key={product.name}>
                            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                            <Typography>{product.line_total.formatted_with_symbol}</Typography>
                        </ListItem>
                    ))
                }
                <ListItem style={{padding:'10px 0'}}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{fontWeight:700}}>
                        {checkOutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
            <div>
                <Typography variant="h6" gutterBottom style={{margin:'20px 0'}}>Payment method</Typography>
                <Elements stripe={stripePromise}>
                    <ElementsConsumer>{({ elements, stripe }) => (
                        <form onSubmit={(e)=>handleSubmit(e,elements,stripe)}>
                            <CardElement />
                            <br /> <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={back}>Back</Button>
                            <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                Pay {checkOutToken.live.subtotal.formatted_with_symbol}
                            </Button>
                            </div>
                        </form>
                    )}
                    </ElementsConsumer>
                </Elements>
            </div>
        </div>
    )
}

export default PaymentForm

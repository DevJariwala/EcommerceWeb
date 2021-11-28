import React,{useState,useEffect} from 'react'
import "./Checkout.css"
import {Paper,Stepper,Step,StepLabel,Typography} from '@material-ui/core'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Confirmation from './Confirmation'
import { commerce } from '../../lib/commerce'

const steps = ['Shipping address','Payment details']

function Checkout({cart,handleCaptureCheckout,order,setCustomerDetails}) {

    const [activeState, setActiveState] = useState(0)
    const [checkOutToken, setCheckOutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})

    useEffect(() => {
        const generateToken = async () =>{
            try {
                const token = await commerce.checkout.generateToken(cart.id,{type:'cart'})
                console.log("Token is ",token);
                setCheckOutToken(token )
            } catch (error) {
                
            }
        }
        generateToken()
    }, [cart])

    const next = (data) =>{
        console.log("data is ",data);
        setShippingData(data)
        nextStep()
    }

    const nextStep = ()=>{
        setActiveState(activeState+1)
    }

    const back = () =>{
        setActiveState(activeState-1)
    }

    const Form = () => activeState===0?<AddressForm checkoutToken={checkOutToken} next={next} setCustomerDetails={setCustomerDetails} />:<PaymentForm shippingData={shippingData} checkOutToken={checkOutToken} back={back} handleCaptureCheckout={handleCaptureCheckout} nextStep={nextStep}/>

    return (
        <div className="checkout">
            <div className="checkout__layout">
                <Paper className="checkout__paper">
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeState} className="checkout__stepper" >
                        {
                            steps.map((step)=>(
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))
                        }
                    </Stepper>
                    {
                        activeState===steps.length?<Confirmation order={order} />:checkOutToken&&<Form /> 
                    }
                </Paper>
            </div>
            
        </div>
    )
}

export default Checkout

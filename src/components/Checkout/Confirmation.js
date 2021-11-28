import React from 'react'
import {CircularProgress,Button} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

function Confirmation({order}) {
    const history=useHistory()
    return (
        (order.customer || order.firstName)?
        <div style={{padding:'20px'}}>
            <p>Thank you for your purchase,{order.firstName} {order.lastName} </p>
            <Button variant="outlined" onClick={()=>history.push('/')}>Back to Home</Button>
        </div>
        :<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><CircularProgress /></div>
    )
}

export default Confirmation

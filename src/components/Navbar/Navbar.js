import React from 'react'
import './Navbar.css'
import {Badge,IconButton} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import { useHistory,useLocation } from 'react-router'
import logo from '../../images/logo.png'



function Navbar({cart}) {

    const history = useHistory()
    const location = useLocation()

   
    return (
        <div className="navbar">
            <div className="navbar__title" onClick={()=>history.push('/')}>
                <img style={{height:'40px',margin:'0 10px'}} src={logo} alt="logo" />
                Eshop Spot
            </div>
            {location.pathname==='/' &&
                <IconButton className="navbar__btn" onClick={()=>history.push('/cart')}>
                    <Badge badgeContent={cart.total_items} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            }
            
        </div>
    )
}

export default Navbar

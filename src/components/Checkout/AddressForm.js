import React,{useState,useEffect} from 'react'
import './AddressForm.css'
import {InputLabel,Select,MenuItem,Grid,Typography, TextField} from '@material-ui/core'
import {useForm,FormProvider} from 'react-hook-form'
import {commerce} from '../../lib/commerce'
import { useHistory } from 'react-router-dom'

function AddressForm({checkoutToken,next,setCustomerDetails}) {

    const history = useHistory();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [city, setCity] = useState('')
    const [zip, setzip] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')


    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    const handleSUBMIT=(firstName,lastName,city,zip,address,email,shippingCountry,shippingSubdivision,shippingOption)=>{
        const customer={
            firstName:firstName,
            lastName:lastName
        }
        setCustomerDetails(customer)
        next({firstName,lastName,city,zip,address,email,shippingCountry,shippingSubdivision,shippingOption})
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    return (
        <div className="addressForm">
            <Typography variant="h6" gutterBottom align="center" style={{padding:'20px'}}>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(()=>handleSUBMIT(firstName,lastName,city,zip,address,email,shippingCountry,shippingSubdivision,shippingOption))}>
                    <Grid container justifyContent="center">
                            <TextField 
                                style={{width:"40%",margin:'10px'}}
                                name="firstName"
                                variant="outlined"
                                label="First Name"
                                fullWidth
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)}
                            />
                            <TextField 
                                style={{width:"40%",margin:'10px'}}
                                name="lastName"
                                variant="outlined"
                                label="Last Name"
                                fullWidth
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}
                            />
                            <TextField 
                                style={{width:"40%",margin:'10px'}}
                                name="city"
                                variant="outlined"
                                label="City"
                                fullWidth
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                            />
                            <TextField 
                                style={{width:"40%",margin:'10px'}}
                                name="zip"
                                variant="outlined"
                                label="ZIP"
                                fullWidth
                                value={zip}
                                onChange={(e)=>setzip(e.target.value)}
                            />
                            <TextField 
                                style={{width:"82%",margin:'10px'}}
                                name="address"
                                variant="outlined"
                                label="Address "
                                fullWidth
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                            />
                            <TextField 
                                style={{width:"82%",margin:'10px'}}
                                name="email"
                                variant="outlined"
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <br />
                            <div style={{width:'82%',margin:'10px'}}>
                                <InputLabel>Shipping Country</InputLabel>
                                <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                    {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div style={{width:'82%',margin:'10px'}}>
                                <InputLabel>Shipping Subdivision</InputLabel>
                                <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                    {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div style={{width:'82%',margin:'10px'}}>
                                <InputLabel>Shipping Options</InputLabel>
                                <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                    {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </Grid>
                        <br />
                        <div className="addressForm__btn">
                                <button onClick={()=>history.push('/cart')}>Back to Cart</button>
                                <button type="submit">Next</button>
                        </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddressForm

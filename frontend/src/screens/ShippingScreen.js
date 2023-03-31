import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, FormGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    console.log(shippingAddress)

    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }
    return (
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='address' className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                </FormGroup>
                <FormGroup controlId='city' className='mb-3'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)} />
                </FormGroup>
                <FormGroup controlId='postalCode' className='mb-3'>
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)} />
                </FormGroup>
                <FormGroup controlId='country' className='mb-3'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)} />
                </FormGroup>
                <Button type='submit' variant='success'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
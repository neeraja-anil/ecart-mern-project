import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutStatus from '../components/CheckoutStatus'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentMethodScreen = () => {

    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        navigate('/shipping')
    }



    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return (
        <>
            <CheckoutStatus step1 step2 step3 />
            <FormContainer>
                <h2>Payment Method</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Select Payment Method</Form.Label>

                        <Col>
                            <Form.Check
                                type='radio'
                                label='PayPal or Credit card'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}>

                            </Form.Check>
                        </Col>
                        {/* <Col>
                            <Form.Check
                                type='radio'
                                label='Stripe'
                                id='stripe'
                                name='paymentMethod'
                                value='stipe'
                                onChange={(e) => setPaymentMethod(e.target.value)}>

                            </Form.Check>
                        </Col> */}
                    </Form.Group>
                    <Button type='submit' variant='primary' className='mt-3'>Continue</Button>

                </Form>

            </FormContainer>
        </>
    )
}

export default PaymentMethodScreen
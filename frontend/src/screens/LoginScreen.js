import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button, FormGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const { search } = useLocation();
    const redirect = search ? new URLSearchParams(search).split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch Login
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error ?
                <Message variant='danger'>{error}</Message> :
                loading && <Loader />
            }
            <Form onSubmit={submitHandler}>
                <Form.Label>Email address</Form.Label>
                <FormGroup controlId='email' className='mb-3'>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup controlId='password' className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
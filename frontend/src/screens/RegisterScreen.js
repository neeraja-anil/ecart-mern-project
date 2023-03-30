import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button, FormGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const { search } = useLocation();
    const redirect = search ? new URLSearchParams(search).get('redirect') : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch register
        if (password !== confirmPassword) {
            setMessage('Passwords Do Not Match')
        } else {
            dispatch(register(name, email, password))
        }

    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error ?
                <Message variant='danger'>{error}</Message> :
                loading && <Loader />
            }
            <Form onSubmit={submitHandler}>
                <Form.Label>Name</Form.Label>
                <FormGroup controlId='name' className='mb-3'>
                    <Form.Control
                        type="text"
                        placeholder="Enter your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </FormGroup>
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
                <FormGroup controlId='password' className='mb-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </FormGroup>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Already Have An account?
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>LOGIN</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
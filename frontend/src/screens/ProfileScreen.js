import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button, FormGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, navigate, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords Do Not Match')
        } else {
            //dispatch update profile
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }

    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated </Message>}
                {loading && <Loader />}
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
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}> <h2>My Orders</h2></Col>

        </Row>
    )
}

export default ProfileScreen
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, FormGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUsers } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import FormContainer from '../components/FormContainer'

const UserEditScreen = () => {

    const { id } = useParams()
    const userId = id
    console.log(userId)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, user, userId, successUpdate, navigate])


    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch register
        dispatch(updateUsers({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger' /> : (
                    <Form onSubmit={submitHandler}>
                        <FormGroup controlId='name' className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </FormGroup>
                        <FormGroup controlId='email' className='mb-3'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup controlId='isAdmin' className='mb-3'>
                            <Form.Check
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)} />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                )}

            </FormContainer>
        </>

    )
}

export default UserEditScreen
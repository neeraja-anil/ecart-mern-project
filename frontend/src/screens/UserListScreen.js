import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers } from '../actions/userActions'

const UserListScreen = () => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])

    const deleteHandler = (id) => {
        console.log(id)
    }

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> :
                error ? <Message variant='danger'>{error}</Message> : (
                    <Table striped responsive bordered hover className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>
                                        {
                                            user.isAdmin ? <i className='fas fa-check' style={{ color: 'green' }}></i> :
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        }
                                    </td>
                                    <td>
                                        <LinkContainer to={`/user/${user._id}`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => {
                                            deleteHandler(user._id)
                                        }}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )

            }
        </>
    )
}

export default UserListScreen
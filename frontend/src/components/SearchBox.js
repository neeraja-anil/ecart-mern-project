import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SearchBox = () => {
    const [keyWord, setKeyWord] = useState('')
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyWord.trim()) {
            navigate(`/search/${keyWord}`)
            console.log('search')
        } else {
            navigate('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyWord(e.target.value)}
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' variant='outline-info' className='p-2'>Search</Button>
        </Form>
    )
}

export default SearchBox
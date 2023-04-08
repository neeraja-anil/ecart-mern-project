import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, FormGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductsDetails } from '../actions/productActions'
//import { PRODUCT_UPDATE_RESET } from '../constants/userConstants'
import FormContainer from '../components/FormContainer'

const ProductEditScreen = () => {

    const { id } = useParams()
    const productId = id
    console.log(productId)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [image, setImage] = useState('')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails



    useEffect(() => {

        if (!product.name || product._id !== productId) {
            dispatch(listProductsDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setImage(product.image)
        }

    }, [dispatch, product, productId, navigate])


    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch register
        // dispatch(updateProducts())
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1 className='mb-4'>Edit Product</h1>

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
                        <FormGroup controlId='price' className='mb-3'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder="Enter Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                        </FormGroup>
                        <FormGroup controlId='image' className='mb-3'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Enter Image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)} />
                        </FormGroup>
                        <FormGroup controlId='description' className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </FormGroup>
                        <FormGroup controlId='brand' className='mb-3'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Enter Brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)} />
                        </FormGroup>
                        <FormGroup controlId='category' className='mb-3'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)} />
                        </FormGroup>
                        <FormGroup controlId='countInStock' className='mb-3'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder="Enter countInStock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)} />
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

export default ProductEditScreen
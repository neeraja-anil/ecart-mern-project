import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


import Rating from '../components/Rating'
import { listProductsDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = () => {

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { error: errorProductReview, success: successProductReview } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductsDetails(id))
  }, [dispatch, id, successProductReview])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id, { rating, comment }))
  }

  return (
    <>

      <Link to={'/'} className='btn btn-light my-3'>Go Back</Link>
      {loading ? (<Loader />) :
        error ? (<Message variant='danger'>{error}</Message>) :
          (
            <>
              <Row>
                <Col md={6} >
                  <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h4>{product.name}</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating value={product.rating} text={`(${product.numReviews} reviews)`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price:${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Description:{product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <ListGroup >
                    <ListGroup.Item>
                      <Row>
                        <Col>Price :</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup >
                    <ListGroup.Item>
                      <Row>
                        <Col>Status</Col>
                        <Col>
                          {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (

                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity</Col>
                          <Col>
                            {product.countInStock > 0 && (
                              <Form.Select
                                className='form-control'
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}>
                                {
                                  [...Array(product.countInStock).keys()].map(count => (
                                    <option key={count + 1} value={count + 1}>{count + 1}</option>
                                  ))
                                }
                              </Form.Select>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                    }
                    <ListGroup.Item>
                      <Button onClick={addToCartHandler} className='btn-block w-100' type='button' disabled={product.countInStock === 0}>ADD TO CART</Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h2>Reviews</h2>
                  {product.reviews.length === 0 && <Message>No Reviews</Message>}
                  <ListGroup variant='flush'>
                    {product.reviews.map(review => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong> <span> ({review.createdAt.substring(0, 10)})</span>
                        <Rating value={review.rating} />

                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                      <h4>Write a customer Review</h4>
                      {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId='rating'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as='select'
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value=''>Select</option>
                              <option value='1'>1-Poor</option>
                              <option value='2'>2-Fair</option>
                              <option value='3'>3-Good</option>
                              <option value='4'>4-very good</option>
                              <option value='5'>5-Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='comment'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as='textarea'
                              row='3'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            > </Form.Control>
                            <Button type='submit' variant='primary'>Submit</Button>
                          </Form.Group>
                        </Form>
                      ) : <Message>Please <Link to='/login'>Sign In</Link> to write a review</Message>}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </>
          )}

    </>
  )
}

export default ProductScreen
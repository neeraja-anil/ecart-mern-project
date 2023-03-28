import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


import Rating from '../components/Rating'
import { listProductsDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = () => {

  const [qty, setQty] = useState(1)
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductsDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>

      <Link to={'/'} className='btn btn-light my-3'>Go Back</Link>
      {loading ? (<Loader />) :
        error ? (<Message variant='danger'>{error}</Message>) :
          (
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
          )
      }

    </>
  )
}

export default ProductScreen
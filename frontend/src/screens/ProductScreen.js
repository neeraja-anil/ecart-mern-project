import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'


import Rating from '../components/Rating'


const ProductScreen = () => {

  const [product, setProduct] = useState({})
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [])

  return (
    <>
      <Link to={'/'} className='btn btn-light my-3'>Go Back</Link>
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
            <ListGroup.Item>
              <Button className='btn-block w-100' type='button' disabled={product.countInStock === 0}>ADD TO CART</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
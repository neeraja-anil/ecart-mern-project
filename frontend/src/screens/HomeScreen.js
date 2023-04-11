import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Meta from '../components/Meta'
import Products from '../components/Products'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'



const HomeScreen = () => {

    const { keyword, pageNumber } = useParams()

    console.log(keyword)

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])


    return (
        <>
            <Meta title='Welcome to ECART | Home' />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            <h1>Latest Products</h1>
            {loading ? (<Loader />) :
                error ? (<Message variant='danger'>{error}</Message>) :
                    (
                        <>
                            <Row>
                                {
                                    products.map(product => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Products product={product} />
                                        </Col>
                                    ))
                                }
                            </Row>
                            <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} />
                        </>
                    )}

        </>
    )
}

export default HomeScreen
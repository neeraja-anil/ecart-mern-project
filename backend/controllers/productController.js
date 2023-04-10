import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


//@desc fetch all products
//@route GET /api/products
//@access public 
const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const products = await Product.find({ ...keyword })
    res.json(products)
})

//@desc fetch product by id
//@route GET /api/products/:id
//@access public 
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})
//@desc Delete product
//@route Delete /api/products/:id
//@access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.deleteOne()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

//@desc Create a product
//@route POST /api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'sample Name',
        user: req.user._id,
        image: '/images/sampleImage.jpg',
        description: 'product description',
        brand: 'product brand',
        category: 'product category',
        price: 0,
        countInStock: 0,
        numReviews: 0,
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//@desc Update a product
//@route PUT /api/products/:id
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {

    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }


})

//@desc Review a product
//@route POST /api/products/:id/reviews
//@access private
const createProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json('Review added')


    } else {
        res.status(404)
        throw new Error('Product not found')
    }


})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview }
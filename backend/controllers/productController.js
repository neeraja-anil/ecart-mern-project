import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


//@desc fetch all products
//@route GET /api/products
//@access public 
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
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
export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }
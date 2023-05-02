import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_CREATE_ITEM_FAIL,
    CART_CREATE_ITEM_REQUEST,
    CART_CREATE_ITEM_SUCCESS,
    CART_DETAILS_FAIL,
    CART_DETAILS_REQUEST,
    CART_DETAILS_SUCCESS,
    CART_REMOVE_ITEM_FAIL,
    CART_REMOVE_ITEM_REQUEST,
    CART_REMOVE_ITEM_SUCCESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const createCart = (cart) => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_CREATE_ITEM_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.post(`/api/cart/`, cart, config)

        dispatch({
            type: CART_CREATE_ITEM_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CART_CREATE_ITEM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }


}

export const getCartDetails = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_DETAILS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/cart`, config)

        dispatch({
            type: CART_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CART_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const removeItem = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_REMOVE_ITEM_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`/api/cart/${id}`, config)

        dispatch({
            type: CART_REMOVE_ITEM_SUCCESS,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: CART_REMOVE_ITEM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch, getState) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
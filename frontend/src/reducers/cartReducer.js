import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_CREATE_ITEM_REQUEST,
    CART_CREATE_ITEM_SUCCESS,
    CART_CREATE_ITEM_FAIL,
    CART_DETAILS_REQUEST,
    CART_DETAILS_SUCCESS,
    CART_DETAILS_FAIL,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: null }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(cartItem => cartItem.product === item.product) //to find if its already exist in the cart

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(cartItem => cartItem.product === existItem.product ? item : cartItem)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        default:
            return state
    }
}

export const cartCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CART_CREATE_ITEM_REQUEST:
            return { loading: true }
        case CART_CREATE_ITEM_SUCCESS:
            return {
                loading: false,
                success: true,
                cart: action.payload
            }
        case CART_CREATE_ITEM_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {}
    }
}

export const cartDetailsReducer = (state = { loading: true, cartItems: [] }, action) => {
    switch (action.type) {
        case CART_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CART_DETAILS_SUCCESS:
            return {
                loading: false,
                cart: action.payload
            }
        case CART_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {}
    }
}
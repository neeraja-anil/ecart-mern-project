import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
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
        default:
            return state
    }
}
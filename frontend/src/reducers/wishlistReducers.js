import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from '../constants/wishlistConstants'

export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
    switch (action.type) {
        case WISHLIST_ADD_ITEM:
            const item = action.payload
            const existItem = state.wishlistItems.find(wishlistItem => wishlistItem.product === item.product) //to find if its already exist in the wishlist

            if (existItem) {
                return {
                    ...state,
                    wishlistItems: state.wishlistItems.map(wishlistItem => wishlistItem.product === existItem.product ? item : wishlistItem)
                }
            } else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item]
                }
            }
        case WISHLIST_REMOVE_ITEM:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter(wishlistItem => wishlistItem.product !== action.payload)
            }
        default:
            return state
    }
}
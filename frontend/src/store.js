import {configureStore} from '@reduxjs/toolkit';
import productListReducer from './reducers/productListSlice';
import productDetailsReducer from './reducers/productDetailsSlice';
import cartReducer from './reducers/cartSlice';

const reducer = {
    products: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
}

const store = configureStore({
    reducer
})

export default store;
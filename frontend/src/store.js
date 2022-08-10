import {configureStore} from '@reduxjs/toolkit';
import productListReducer from './reducers/productListSlice';
import productDetailsReducer from './reducers/productDetailsSlice';
import cartReducer from './reducers/cartSlice';
import userLoginReducer from './reducers/userLoginSlice';
import userRegisterReducer from './reducers/userRegisterSlice';
import userDetailsReducer from './reducers/userDetailsSlice';
import userProfileUpdateReducer from './reducers/userProfileUpdateSlice';
import createOrderReducer from './reducers/createOrder';
import orderDetailsReducer from './reducers/orderDetailsSlice';
import orderPaymentReducer from './reducers/orderPaySlice';
import  myOrdersReducer from './reducers/myOrderListSlice';
import usersListReducer from './reducers/usersListSlice';
import userDeleteReducer from './reducers/userDeleteSlice';
import userUpdateReducer from './reducers/userUpdateSlice';
import productDeleteReducer from './reducers/productDeleteSlice';
import productCreateReducer from './reducers/productCreateSlice';
import updateProductReducer from './reducers/updateProductSlice';
import allOrdersReducer from './reducers/allOrdersSlice';
import orderDeliverReducer from './reducers/orderDeliverSlice';
import createReviewReducer from './reducers/createReviewSlice';
import topRatedProductsReducer from './reducers/topRatedProductsSlice';

const reducer = {
    products: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userProfile: userProfileUpdateReducer,
    createOrder: createOrderReducer,
    orderDetails: orderDetailsReducer,
    orderPayment: orderPaymentReducer,
    myOrders: myOrdersReducer,
    userList: usersListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productUpdate: updateProductReducer,
    productCreate: productCreateReducer,
    allOrders: allOrdersReducer,
    deliverOrder: orderDeliverReducer,
    createReview: createReviewReducer,
    topRatedProducts: topRatedProductsReducer
}

const store = configureStore({
    reducer
})

export default store;
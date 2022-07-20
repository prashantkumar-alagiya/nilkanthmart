import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:  JSON.parse(localStorage.getItem('cartItems')) || []
    },
    reducers: {
        addToCart: (state,action) => {
            const productItem  = action.payload;
            const foundItem = state.cartItems.find((product) => {
                return product.id === productItem.id;
            })

            if(foundItem){
                state.cartItems = state.cartItems.map((item) => {
                    return item.id === productItem.id ? productItem : item;
                })
            }else{
                state.cartItems = [...state.cartItems, productItem]
            } 

            localStorage.setItem('cartItems',JSON.stringify(state.cartItems));

        },
        removeFromCart: (state,action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((product) => {
                return  product.id !== id;
            })

            localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
        },
        updateQuantity: (state,action) => {
            const {id,operation} = action.payload;
            const product = state.cartItems.find((item) => {
                return item.id === id;
            })
            if(operation === 'INCREMENT'){
                product.qty = product.qty + 1;
            }
            else if(operation === 'DECREMENT'){
                product.qty = product.qty - 1;
            }

            state.cartItems = state.cartItems.map((item) => {
                return item.id === id ? product : item;
            })
            
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
        }
    }
});

const actions = cartSlice.actions;
export default cartSlice.reducer;
export {actions};
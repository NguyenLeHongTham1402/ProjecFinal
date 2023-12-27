import { configureStore } from "@reduxjs/toolkit";
import * as utilities from "./modules/utilities";
import * as category from "./modules/category";
import * as product from './modules/products'
import * as cart from './modules/shopping-cart'

const store = configureStore({
    reducer:{
        cates:category.catesReducer,
        utils:utilities.utilsReducer,
        products:product.prodsReducer,
        cart: cart.cartReducer
    }
})

export default store
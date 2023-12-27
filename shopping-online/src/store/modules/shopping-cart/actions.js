import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'

const addToCart = createAsyncThunk('cart/addToCart', async (values) => {
    const isDiscount = Boolean(values['product'].discounts)
    const cost= Number(values['product'].price)
    const price = isDiscount ? cost*0.85 : cost
    const total = price*Number(values['value'].quantity)
    const data = {
        id:uuidv4(),
        productId:values['product'].id,
        productName:values['product'].name,
        productImage:values['product'].images[0].path,
        quantity:values['value'].quantity,
        size:values['value'].size,
        price:price,
        total:total
    }
    return {
        data,
        onHand: values['onHandQty']
    }
})

const deleteToCart = createAsyncThunk('cart/deleteToCart', async(id) => {
    return id
})

const updateToCart = createAsyncThunk('cart/updateToCart', async({id, quantity}) => {
    return {
        id,
        quantity
    }
})

export {
    addToCart,
    deleteToCart,
    updateToCart
}
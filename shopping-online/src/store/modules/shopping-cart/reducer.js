import { createReducer } from "@reduxjs/toolkit";
import * as cartActions from './actions'

const cartReducer = createReducer({
    data:[],
    errors:false
}, (builder) => {
    builder
    .addCase(cartActions.addToCart.fulfilled, (state, action) => {
        const cartIndex = state.data.findIndex((c) => c.productId == action.payload.data.productId 
                        && c.size==action.payload.data.size)
        if (cartIndex === -1) {
            if(action.payload.data.quantity > action.payload.onHand)
            {
                window.alert('Not enough inventory!!!')
                return
            }
            state.data.push(action.payload.data)
            state.errors=false
        } else {
            const sumQuantity = Number(state.data[cartIndex].quantity) + Number(action.payload.data.quantity)
            const total = state.data[cartIndex].total + action.payload.data.total
            if(sumQuantity > Number(action.payload.onHand))
            {
                window.alert('Not enough inventory!!!')
                return
            }
            if( sumQuantity > 3){
                window.alert('Orders Maximum 3 Products!')
            }
            else{
                state.data[cartIndex].quantity=sumQuantity
                state.data[cartIndex].total=total
                state.errors=false
            }
        }
    })
    .addCase(cartActions.deleteToCart.fulfilled, (state, action) => {
        state.data = state.data.filter(x=>x.id != action.payload)
    })
    .addCase(cartActions.updateToCart.fulfilled, (state, action) => {
        const cartIndex = state.data.findIndex(x=>x.id==action.payload.id)
        if(cartIndex > -1){
            state.data[cartIndex].quantity = action.payload.quantity
            state.data[cartIndex].total = Number(action.payload.quantity)*Number(state.data[cartIndex].price)
        }
    })
})

export default cartReducer
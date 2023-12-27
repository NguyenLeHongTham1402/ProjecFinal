import { createReducer } from "@reduxjs/toolkit";
import * as productAction from './actions'


const prodsReducer = createReducer({
    loading:false,
    error:true,
    product:{}
},(builder) => {
    builder
    .addCase(productAction.getById.pending, (state, action) => {
        state.loading = true
        state.product = {}
    })
    .addCase(productAction.getById.fulfilled, (state, action) => {
        state.loading = false
        state.product = action.payload
    })
    .addCase(productAction.add.pending, (state, action) => {
        state.error=false;
    })
    .addCase(productAction.add.fulfilled, (state, action) => {
        
    })
    .addCase(productAction.add.rejected, (state, action) => {
        state.error=true;
    })
    .addCase(productAction.update.pending, (state, action) => {
        state.error=false;
    })
    .addCase(productAction.update.fulfilled, (state, action) => {
        
    })
    .addCase(productAction.update.rejected, (state, action) => {
        state.error=true;
    })
})

export default prodsReducer
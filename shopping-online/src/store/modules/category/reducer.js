import { createReducer } from "@reduxjs/toolkit";
import * as categoryAction from './actions'


const catesReducer = createReducer({
    loading:false,
    error:true,
    // parent:[],
    item:[],
    data:[]
},(builder) => {
    builder
    .addCase(categoryAction.get.pending, (state, action) => {
        state.loading=true
    })
    .addCase(categoryAction.get.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
    })
    .addCase(categoryAction.getById.pending, (state, action) => {
        state.loading = true
    })
    .addCase(categoryAction.getById.fulfilled, (state, action) => {
        state.loading = false
        state.item = action.payload
    })
})

export default catesReducer
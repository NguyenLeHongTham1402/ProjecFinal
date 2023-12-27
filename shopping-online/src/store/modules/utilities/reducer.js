import { createReducer } from "@reduxjs/toolkit";
import * as utilitiesAction from './actions'

const utilsReducer = createReducer({
    ads:[],
    banners:[]
},(builder) => {
    builder
    .addCase(utilitiesAction.getAds.fulfilled, (state, action) => {
        state.ads = action.payload
    })
    .addCase(utilitiesAction.getBanners.fulfilled, (state, action) => {
        state.banners = action.payload
    })
    
})

export default utilsReducer
import {createAsyncThunk} from '@reduxjs/toolkit'

const getAds = createAsyncThunk('ads/getAds', async() => {
    const ads = [
        {
            id:1,
            url:'https://shop-t1-na.gg/cdn/shop/files/T1-X-MASTERCARD-WEB-BANNER._1600x.gif?v=1700614319',
            isActive:true
        },
        {
            id:2,
            url:'https://shop-t1-na.gg/cdn/shop/files/T1-XMAS-23_1600x.gif?v=1702060835',
            isActive:true
        }
    ]
    return ads
})

const getBanners = createAsyncThunk('banners/getBanners', async() => {
    const banners = [
        {
            id:1,
            url:'https://shop-t1-na.gg/cdn/shop/files/Worlds-23_c29b5dd0-5b0c-4e5b-b2b0-527a105c3ea3_2000x.jpg?v=1698965912',
            isActive:true
        },
        {
            id:2,
            url:'https://cdn.realsport101.com/images/ncavvykf/realsport-production/3dcedb74abc63c963f1d747f8c559fde5eb14176-4096x2732.jpg?rect=0,290,4096,2150&w=1200&h=630&auto=format',
            isActive:true
        }
    ]
    return banners
})


export {
    getAds,
    getBanners
}
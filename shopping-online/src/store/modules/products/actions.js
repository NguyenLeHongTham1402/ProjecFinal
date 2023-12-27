import {createAsyncThunk} from '@reduxjs/toolkit'
import * as productSvc from './services'

const getById = createAsyncThunk('products/getById', async(id) => {
    const prods = productSvc.getProductById(id)
    return prods
})

const add = createAsyncThunk('products/add', async(values) => {
    return productSvc.addProduct(values)
})

const update = createAsyncThunk('products/update', async(values) => {
    return productSvc.editProduct(values)
})

export {
    getById,
    add,
    update

}
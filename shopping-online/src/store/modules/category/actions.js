import {createAsyncThunk} from '@reduxjs/toolkit'
import * as categorySvc from './services'

const get = createAsyncThunk('categories/getCategories', async() => {
    const cates = categorySvc.getCategories()
    return cates
})

const getParent = createAsyncThunk('categories/getParentCategories', async() => {
    const prCates = categorySvc.getParentCategories()
    return prCates
})

const getById = createAsyncThunk('categories/getCategoryById', async(id) => {
    const cate = categorySvc.getById(id)
    return cate
})

const add = createAsyncThunk('categories/add', async(values) => {
    return categorySvc.addCategory(values)
})

const update = createAsyncThunk('categories/update', async(values) => {
    return categorySvc.updateCategory(values)
})

export {
    get,
    getParent,
    getById,
    add,
    update

}
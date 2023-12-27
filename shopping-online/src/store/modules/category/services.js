import axios from 'axios'
import * as apiUrl from '@/helpers/getApiUrl'

const API_CATE = apiUrl.getApiCateProd("Category")

export async function getCategories(){
    const response = await axios.get(
        API_CATE
    )
    return response.data
}

export async function getById(id){
    const response = await axios.get(
        `${API_CATE}/${id}`
    )
    return response.data
}

export async function getParentCategories(){
    const url = new URL(API_CATE)
    url.searchParams.append('isParent', true)
    const response = await axios.get(
        url
    )
    return response.data
}

export const getSubCategories = (values, id) => {
    const data = values.filter(x=>x.isActive==true&&x.parentId==id)
    return data
}


export async function addCategory(values){
    try{
        const response = await axios.post(API_CATE, values)
        return response.data
    }catch{
        return {}
    }
    
}

export async function updateCategory(values){
    try{
        const response = await axios.put(`${API_CATE}/${values.id}`, values)
        return response.data
    }
    catch{
        return {}
    }
    
}

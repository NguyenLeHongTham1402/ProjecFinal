import axios from 'axios'
import * as apiUrl from '@/helpers/getApiUrl'

const API_PROD = apiUrl.getApiCateProd("Product")
// const PAGE_SIZE = 20

export const getProducts = async(category,name,fromPrice,toPrice) => {
    const API_URL = new URL(API_PROD)
    let result = []
    API_URL.searchParams.append('isActive', true)
    await axios.get(
        API_URL
    ).then(response => {
        let products = response.data
        if(category){
            products = products.filter(x=>x.note.includes(category))
        }
        if(name){
            products = products.filter(x=>x.name.includes(name))
        }
        if(fromPrice>=0){
            products = products.filter(x=>x.price >= fromPrice)
        }
        if(toPrice>=0){
            products = products.filter(x=>x.price <= toPrice)
        }
        result.push(products)
    })
    return result[0]
}

export async function getProductById(id) {
    const response = await axios.get(
        `${API_PROD}/${id}`
    )
    return response.data
}

// export async function getProductsBySubCate(id){
//     const API_URL = new URL(API_PROD)
//     API_URL.searchParams.append('note', `SC${id}`)

//     const response = await axios.get(
//         API_URL
//     )
//     console.log(response.status===200 ? response.data : [])
//     return response.data
// }

// export async function getProductsByCate(id){
//     const API_URL = new URL(API_PROD)
//     API_URL.searchParams.append('note', `C${id}`)

//     const response = await axios.get(
//         API_URL
//     )
//     return response.data
// }

export const getProductsByCate = (values, id) => {
    const data = values.filter(x=>x.isActive==true && x.note.includes(`C${id}`))
    return data
}

export const getProductsBySubCate = (values, id) => {
    const data = values.filter(x=>x.isActive==true && x.note.includes(`SC${id}`))
    return data
}

export async function addProduct(values){
    const response = await axios.post(API_PROD, values)
    return response.data
}

export async function editProduct(values){
    const response = await axios.put(`${API_PROD}/${values.id}`, values)
    return response.data
}

import { useDispatch, useSelector } from "react-redux"
import ProductItem from "./ProductItem/ProductItem"
import { Title, Wrapper, Container } from "./styled"
import {prodsActions, prodsSelectors, prodsSvc} from "@/store/modules/products"
import React, { useCallback, useEffect, useState } from "react"
import Advertisement from './Advertisement'
import Banners from './Banner'
import {useSearchParams } from "react-router-dom"

function Products(){
    const [products, setProducts] = useState([])
    const [title, setTitle] = useState('')
    const [search, setSearch] = useSearchParams()

    const category = search.get('category')
    const cateId=search.get('n')

    const loadData = async() => {
        const data = await prodsSvc.getProducts(cateId,'',-1,-1)
        setProducts(data)
        if(category)
            setTitle(category)
        else
            setTitle('all')
    }

    useEffect(() => {    
        loadData()  
    }, [search])


    return (
        <>
            <Advertisement/>
            <Banners/>
            <Container>
                <Title>{title}</Title>
                <Wrapper>
                    {
                        products.map(p => (
                            <ProductItem key={p.id} values={p}/>
                        ))

                    }
                </Wrapper>
            </Container>
        </>
    )
}

export default Products
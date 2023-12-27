import React from 'react';
import { ProductImage, ProductPrice, ProductTitle, Wrapper, CostProduct } from './styled';
import { numberFormat } from '@/utils/number';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {prodsActions } from '@/store/modules/products'

function ProductItem({values}) {
    const dispatch = useDispatch()
    const loadProduct = () => {
        dispatch(prodsActions.getById(values.id))
    }
    return (
        <Wrapper key={values.id}>
            <Link onClick={loadProduct} to={'/product/'+values.id}>
                <ProductImage src={values.images[0].path} alt='image'/>
            </Link>
            <Link onClick={loadProduct} to={'/product/'+values.id}>
                <ProductTitle>{values.name}</ProductTitle>
            </Link>
            <ProductPrice>
                {values.discounts &&(
                    <p className='price'>{numberFormat(values.price*0.85)}<span>đ</span></p>
                    
                )}
                <CostProduct className='cost' $cost={values.discounts ? 'line-through' : 'none'}>
                    {numberFormat(values.price)}<span>đ</span>
                </CostProduct>
            </ProductPrice>
        </Wrapper>
    );
}

export default ProductItem;
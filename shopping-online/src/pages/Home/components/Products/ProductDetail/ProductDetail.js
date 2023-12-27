import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Styled from './styled'
import { numberFormat } from '@/utils/number';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { prodsActions, prodsSelectors} from '@/store/modules/products'
import { cartActions, cartSelectors} from '@/store/modules/shopping-cart'

const initNoti = {
    'display': 'none',
    'message': ''
}
const initForm = {
    'size': '',
    'quantity': 1,
}

function ProductDetail() {
    // const [quantity, setQuantity] = useState(0)
    const [showNoti, setShowNoti] = useState(initNoti)
    const [formValue, setFormValue] = useState(initForm)
    const product = useSelector(prodsSelectors.selectProduct)
    const dispatch = useDispatch()
    const params = useParams()

    const textAreaRef = useRef(null)

    const resizeTextArea = () => {
        if(product.id>0){
            textAreaRef.current.style.height = "auto"
            textAreaRef.current.style.fontSize = 16 + "px"
            textAreaRef.current.style.lineHeight = 28 + "px"
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
        }
        
    }

    useEffect(()=>{
        dispatch(prodsActions.getById(params.id))   
    },[])
    
    useEffect(resizeTextArea,[resizeTextArea])

    const handleIncreament = () => {
        
        if (formValue.quantity < 3)
            setFormValue({
                ...formValue, 
                quantity: formValue.quantity + 1
        })
        else {
            setShowNoti({
                'display': 'flex',
                'message': 'Orders Maximum 3 Products!'
            })
            window.scrollTo(200, 0)
        }
    }

    const handleDecreament = () => {
        if (formValue.quantity > 1)
            setFormValue({
                ...formValue, 
                quantity: formValue.quantity - 1
        })
        else {
            setShowNoti({
                'display': 'flex',
                'message': 'Orders Minimum 1 Products!'
            })
            window.scrollTo(0, 0)
        }
    }

    const handleCloseNoti = () => {
        setShowNoti(initNoti)
        setFormValue({
            ...formValue,
            quantity:1
        })
    }

    const handleChangImage = (id) => {
        const elementMain = document.getElementById(`img${id}`)
        const elementSub = document.getElementById(`sub-img${id}`)
        const elementsSub = document.getElementsByClassName('active')
        for (var i = 0; i < elementsSub.length; i++) {
            elementsSub[i].classList.remove('active');
        }
        elementSub.classList.add('active')
        const y = elementMain.getBoundingClientRect().top - 200
        const x = 0
        window.scrollTo(x, y)
    }

    const handleChangeValue = (e) => {
        console.log(e.target.value)
        if(e.target.name === 'quantity')
        {
            if (isNaN(e.target.value)) {
                window.alert('Please Input Number!')
                return
            } 
        }
        setFormValue({
            ...formValue,
            [e.target.name]:e.target.value
        })
    }

    function getOnHandQuantity(size){
        console.log(size)
        return product.sizes.find((x) => x.name == size)
    }

    function handleAddToCart(){
        if(formValue.size===''){
            window.alert('Please Choose Size!')
            return
        }
        
        if(formValue.quantity > 0 && formValue.quantity <= 3)
        {
            dispatch(cartActions.addToCart({
                product,
                value: formValue,
                onHandQty: getOnHandQuantity(formValue.size).quantity
            }))
        }
        else{
            setShowNoti({
                'display': 'flex',
                'message': 'Orders Least 1 And Most 3 Products!'
            })
            window.scrollTo(200, 0)
        }

    }

    return (
        <Styled.Wrapper>
            <Styled.Notification $dp={showNoti.display}>
                <i className="fa fa-exclamation-triangle rotate"></i>
                &nbsp; &nbsp;
                <span>{showNoti.message}</span>
                &nbsp; &nbsp;
                <i onClick={handleCloseNoti} className="fa fa-times-circle" aria-hidden="true"></i>
            </Styled.Notification>
            {product.id > 0 && (
                <Styled.ContainerDetail>
                    <li>
                        {product.images.map(p => (
                            <Styled.ImageLeft id={`sub-img${p.imageId}`}
                                onClick={() => handleChangImage(p.imageId)} key={p.imageId}>
                                <img src={p.path} alt={`si${p.imageId}`} />
                            </Styled.ImageLeft>

                        ))}
                    </li>
                    <li className='main-img'>
                        {product.images.map(p => (
                            <Styled.ImageMain id={`img${p.imageId}`} key={p.imageId}>
                                <img src={p.path} alt={`i${p.imageId}`} />
                            </Styled.ImageMain>

                        ))}
                    </li>
                    <li className='main-content'>
                        <Styled.ProductMeta>
                            <Styled.ProductName>{product.name}</Styled.ProductName>
                            <Styled.ProductSKU>
                                {product.SKU && (
                                    <span>SKU: {product.SKU}</span>
                                )}
                            </Styled.ProductSKU>
                            <Styled.ProductPrice>
                                {product.discounts && (
                                    <span className='price'>{numberFormat(product.price * 0.85)}đ</span>
                                )}
                                <span className={`cost${product.discounts ? 1 : 0}`}>
                                    {numberFormat(product.price)}đ
                                </span>
                            </Styled.ProductPrice>
                        </Styled.ProductMeta>
                        <hr />
                        <Styled.ProductMetaDesc>
                            <Styled.TextArea value={product.description} ref={textAreaRef} readOnly={true}>
                                {product.description}
                            </Styled.TextArea>
                        </Styled.ProductMetaDesc>
                        <Styled.ProductShare>
                            <li>Share</li>
                            <li>
                                <Link><i className="fa fa-facebook" aria-hidden="true"></i></Link>
                            </li>
                            <li>
                                <Link><i className="fa fa-twitter" aria-hidden="true"></i></Link>
                            </li>
                            <li>
                                <Link><i className="fa fa-pinterest" aria-hidden="true"></i></Link>
                            </li>
                        </Styled.ProductShare>
                        <Styled.ProductSize>
                            <select name='size' value={formValue.size} onChange={handleChangeValue} >
                                <>
                                    <option value=''>Select Size...</option>
                                    {product.sizes.map(x => (
                                        <option key={x.sizeId} value={x.name}>size: {x.name}</option>
                                    ))}
                                </>
                            </select>
                        </Styled.ProductSize>
                        <Styled.ProductQuantity>
                            <Styled.Button onClick={handleDecreament}>
                                <i className="fa fa-minus" aria-hidden="true"></i>
                            </Styled.Button>
                            <Styled.Input name='quantity' value={formValue.quantity} pattern='[0-9]' 
                                onChange={(e) => handleChangeValue(e)}/>
                            <Styled.Button onClick={handleIncreament}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </Styled.Button>
                        </Styled.ProductQuantity>
                        <Styled.BtnAddCart type='submit' onClick={handleAddToCart}>Add to cart</Styled.BtnAddCart>
                        <Styled.BtnPayment>
                            <i className="fa fa-credit-card-alt" aria-hidden="true"></i> Buy with Payment
                        </Styled.BtnPayment>
                    </li>
                </Styled.ContainerDetail>
            )}


        </Styled.Wrapper>
    );

}
export default ProductDetail
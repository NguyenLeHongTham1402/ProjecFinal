import React, { useEffect, useState } from 'react';
import {CartItem, ButtonQty, InputQty} from './styled'
import { useDispatch } from 'react-redux';
import {cartActions} from '@/store/modules/shopping-cart'

function Cart({cart}) {

    const dispatch = useDispatch()
    const [qty, setQty] = useState(cart.quantity)

    useEffect(()=>{
        setQty(cart.quantity)
    },[cart])

    const handleIncreament = () => {
        
        if (qty < 3){            
            dispatch(cartActions.updateToCart({
                id:cart.id,
                quantity:Number(qty+1)
            }))
            setQty(qty+1)
        }
        else {
            window.alert('Orders Maximum 3 Products!')
        }
    }

    const handleDecreament = () => {
        if (qty > 1){          
            dispatch(cartActions.updateToCart({
                id:cart.id,
                quantity:Number(qty-1)
            }))
            setQty(qty-1)
        }
        else {
            window.alert('Orders Minimum 1 Products!')
        }
    }

    const handleDelete = () => {
        if(window.confirm('Do you want delete this item?')){
            dispatch(cartActions.deleteToCart(cart.id))
        }
    }

    const handleChangeValue = (e) => {
        if (isNaN(e.target.value)) {
            window.alert('Please Input Number!')
            return
        } 
        setQty(e.target.value)
    }

    const handleUpdateValue = () => {
        if(qty > 3){
            window.alert('Orders Maximum 3 Products!')
            setQty(cart.quantity)
            return
        }
        dispatch(cartActions.updateToCart({
            id:cart.id,
            quantity:Number(qty)
        }))
    }

    return (
        <CartItem>
            <li>
                <img src={cart.productImage} alt='img'/>
            </li>
            <li>
                <h3>{cart.productName} - Size: {cart.size}</h3>
                <div className='cartProperties'>
                    <div>
                        <ButtonQty onClick={handleDecreament}>-</ButtonQty>
                        <InputQty onBlur={handleUpdateValue} onChange={handleChangeValue} 
                                    name='quantity' value={qty} pattern='[0-9]' />
                        <ButtonQty onClick={handleIncreament}>+</ButtonQty>
                    </div>
                    <p onClick={handleDelete}>Remove</p>
                </div>
            </li>
        </CartItem>
    );
}

export default Cart;
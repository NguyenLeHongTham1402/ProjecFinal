import styled from "styled-components";

const CartItem = styled.ul`
    display: flex;
    justify-content: space-between;
    padding: 30px;
    list-style: none;
    gap: 20px;
    li{
        &:nth-child(1){
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            img{
                width: 100%;
            }
        }
        &:nth-child(2){
            flex: 2.5;
            h3{
                font-weight: 500;
                margin-bottom: 20px;
            }
            .cartProperties{
                display: flex;
                justify-content: space-between;
                p{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: underline;
                    &:hover{
                        text-decoration: none;
                        cursor: pointer;
                    }
                }
            }
        }
    }
`
const ButtonQty = styled.button`
    padding: 5px 10px;
    text-align: center;
    border: 0.8px solid #cdcdcd;
    font-size: 14px;
    font-weight: bold;
`

const InputQty = styled.input`
    /* padding: 10px 20px; */
    text-align: center;
    width: 30px;
    height: 28px;
    border: 0.8px solid #cdcdcd;
    font-size: 14px;
    font-weight: bold;
    &:focus{
        outline: none;
    }
`

export {
    CartItem,
    ButtonQty,
    InputQty
}
import styled from "styled-components";

export const Wrapper = styled.div`
    color: #000;
    margin-top: 200px;

`

export const ContainerDetail = styled.ul`
    display: flex;
    justify-content: space-around;
    width: 86%;
    margin: 0 auto;
    gap: 15px;

    li{
        flex: 1;
        list-style: none;
        img{
            display: block;
        }
        &.main-img, &.main-content{
            flex: 2;
        }
        /* &.main-content{
            textarea{
                width: 100%;
                border: none;
                padding: 8px 0;
                resize: none;
            }
        } */
    }
    
`
export const ImageLeft = styled.div`
    display: block;
    width: 68px;
    min-height: 70px;
    margin: 20px 0;
    cursor: pointer;
    img{
        width: 100%;
        height: 100%;
    }
`
export const ImageMain = styled.div`
    width: 350px;
    height: 358px;
    cursor: zoom-in;
    margin: 25px 0;
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
`
export const ProductMeta = styled.div`
    margin-bottom: 24px;
`

export const ProductName = styled.p`
    font-size: 22px;
    font-weight: 500;
    line-height: 36.3px;
`

export const ProductSKU = styled.div`
    font-size: 15px;
    line-height: 24.75px;
    margin-bottom: 15px;
`

export const ProductPrice = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 20px;
    span{
        display: inline-block;
        font-size: 19px;
        font-weight: 500;
        &.price{
            color: red;
        }
        &.cost1{
            text-decoration: line-through;
        }
        &.cost0{
            text-decoration: none;
        }
    }
    
`

export const ProductMetaDesc = styled.div`
    margin: 24px 0;
`

export const TextArea = styled.textarea`
    width: 100%;
    border: none;
    padding: 8px 0;
    resize: none;
    /* font-size: 16px; */
`

export const ProductShare = styled.ul`
    width: 20%;
    margin-bottom: 24px;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 10px;
    list-style: none;
    li{
        font-size: 14px;
        font-weight: 500;
        a{
            text-decoration: none;
            color: #000;
        }
    }
`

export const ProductSize = styled.div`
    margin-bottom: 24px;
    select{
        padding: 12px 20px;
        border: 1.2px solid #dcdcdc;
        border-radius: 2px;
        width: 100%;
        font-size: 16px;
        text-transform: uppercase;
        font-size-adjust: 0.3;
        &:focus{
            outline: none;
        }
    }
    
`

export const ProductQuantity = styled.div`
    margin-bottom: 24px;
`
export const Button = styled.button`
    padding: 10px 20px;
    text-align: center;
    border: 0.8px solid #cdcdcd;
    font-size: 16px;
`

export const Input = styled.input`
    /* padding: 10px 20px; */
    text-align: center;
    width: 50px;
    height: 39.5px;
    border: 0.8px solid #cdcdcd;
    font-size: 16px;
    font-weight: bold;
    &:focus{
        outline: none;
    }
`

export const Notification = styled.div`
    border-radius: 5px;
    width: 350px;
    height: 30px;
    text-align: left;
    display: ${props => props.$dp};
    align-items: center;
    padding: 10px;
    background-color: #2B3246;
    cursor:pointer;
    box-shadow:  9px 9px 18px #262c3e,
      -9px -9px 18px #30384e;
    color: rgb(247, 149, 72);
    margin: 20px;
    &:hover{
        background-color: rgba(247, 149, 73, 0.50);
        transition:0.5s;
    }
`

export const BtnAddCart = styled.button`
    display: inline-block;
    width: 100%;
    padding: 15px 20px;
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    border: 0.8px solid #cdcdcd;
    border-radius: 2px;
    margin-bottom: 24px;

`
export const BtnPayment = styled.button`
    display: inline-block;
    width: 100%;
    padding: 15px 20px;
    text-align: center;
    font-size: 16px;
    border: 0.8px solid #cdcdcd;
    border-radius: 2px;
    margin-bottom: 24px;
    color: #fff;
    background: #5a31f4;
    &:hover{
        background: blue;
    }

`
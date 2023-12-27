import styled from "styled-components";

export const Wrapper = styled.div`
    color: black;
    a{
        text-align: center;
        text-decoration: none;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export const ProductImage = styled.img`
    width: 90%;
    height: 100%;
    display: block;
`
export const ProductTitle = styled.h2`
    margin: 5px ;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 510;
    text-align: center;
    text-transform: capitalize;
`

export const ProductPrice = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    p{
        flex: 0.1;
        font-size: 16px;
        font-weight: 500;
        span{
            text-decoration: underline;
        }
        &.price{
            /* text-align: right; */
            color: red;
            /* flex: 1; */
        }
    }
`

export const CostProduct = styled.p`
    text-decoration: ${props => (`${props.$cost}`)};
`
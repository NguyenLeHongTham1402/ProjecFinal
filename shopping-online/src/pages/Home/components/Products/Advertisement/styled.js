import styled from "styled-components";

const Wrapper = styled.div`
    max-width:100%;
    margin-top: 168.7px;
    overflow: hidden;
    .slick-dots{
        bottom: 12px;
    }
    .slick-dots li button:before{
        font-size:10px;
    }
    .slick-dots li.slick-active button:before{
        color:#fb512a;
    }
    .slick-next{
        right: 20px;
        display: none !important;
    }
    .slick-prev{
        left: 100px;
    }
`

const SliderItem = styled.img`
    max-width: 100%;
    height: 100vh;
    display: block;

`

export {
    Wrapper,
    SliderItem
}

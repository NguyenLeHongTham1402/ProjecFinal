import styled from "styled-components";

const BannerContainer = styled.div`
    margin: 0 auto;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    .slick-dots{
        bottom: 12px;
    }
    .slick-dots li button:before{
        font-size:10px;
        color: #fff;
    }
    .slick-dots li.slick-active button:before{
        color:#fb512a;
    }
    .slick-next{
        right: 20px;
        display: none !important;
    }
    .slick-prev{
        left: 20px;
    }

`
const SliderItem = styled.img`
    max-width: 100%;
    height: 100vh;
    display: block;

`

export {
    BannerContainer,
    SliderItem,
}
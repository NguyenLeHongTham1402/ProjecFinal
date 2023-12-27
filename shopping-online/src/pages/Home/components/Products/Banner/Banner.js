import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { BannerContainer, SliderItem } from "./styled";
import { useEffect } from "react";
import {utilsSelectors, utilsActions} from '@/store/modules/utilities' 

function Banners(){
    const dispatch = useDispatch()
    const banners = useSelector(utilsSelectors.selectBanners)

    useEffect(() => {
        dispatch(utilsActions.getBanners())
    }, [dispatch])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
    };

    return(
        <BannerContainer>
            <Slider {...settings}>
                {
                    banners.map(b => (
                        <SliderItem key={b.id} src={b.url} alt={b.id}/>
                    ))
                }
                
            </Slider>
        </BannerContainer>
    )
}

export default Banners
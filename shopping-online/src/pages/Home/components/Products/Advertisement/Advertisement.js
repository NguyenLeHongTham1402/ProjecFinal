import Slider from "react-slick";
import { SliderItem, Wrapper } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {utilsSelectors, utilsActions} from '@/store/modules/utilities' 


function Advertisement(){

    const dispatch = useDispatch()

    const ads = useSelector(utilsSelectors.selectAds)

    useEffect(() => {
        dispatch(utilsActions.getAds())
    }, [dispatch])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
      };

    return(
        <Wrapper>
            <Slider {...settings}>
                {
                    ads.map(a => (
                        <SliderItem key={a.id} src={a.url} alt={a.id}/>
                    ))
                }
                
            </Slider>
        </Wrapper>
    )
}

export default Advertisement
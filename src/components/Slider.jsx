import Slider from 'react-slick'

import slider1 from '../assets/images/sliders/slider1.jpeg'
import slider2 from '../assets/images/sliders/slider2.jpeg'
import slider3 from '../assets/images/sliders/slider3.jpeg'

const Silder = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    }
    return (
        <div className="slider">
            <Slider {...settings}>
                <div className="slider__item">
                    <img src={slider1} alt="" />
                </div>
                <div className="slider__item">
                    <img src={slider2} alt="" />
                </div>
                <div className="slider__item">
                    <img src={slider3} alt="" />
                </div>
            </Slider>
        </div>
    )
}

export default Silder

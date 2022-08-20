import Slider from 'react-slick'

import slider1 from '../assets/images/sliders/slider1.jpeg'
import slider2 from '../assets/images/sliders/slider2.jpeg'
import slider3 from '../assets/images/sliders/slider3.jpeg'

function NextArrow(props) {
    const { className, style, onClick } = props
    return <div className={className} style={{ ...style }} onClick={onClick} />
}

function PrevArrow(props) {
    const { className, style, onClick } = props
    return <div className={className} style={{ ...style }} onClick={onClick} />
}

const Silder = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
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

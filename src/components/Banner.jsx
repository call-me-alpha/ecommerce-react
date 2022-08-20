import Slider from 'react-slick'

import banner1 from '../assets/images/stores/store1.png'
import banner2 from '../assets/images/stores/store2.jpeg'
import banner3 from '../assets/images/stores/store3.jpeg'
import banner4 from '../assets/images/stores/store4.jpeg'

const Banner = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        initialSlide: 0,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true
                }
            }
        ]
    }

    return (
        <div className="banner">
            <Slider {...settings}>
                <div className="banner__item">
                    <img src={banner1} alt="" />
                </div>
                <div className="banner__item">
                    <img src={banner2} alt="" />
                </div>
                <div className="banner__item">
                    <img src={banner3} alt="" />
                </div>
                <div className="banner__item">
                    <img src={banner4} alt="" />
                </div>
                <div className="banner__item">
                    <img src={banner1} alt="" />
                </div>
                <div className="banner__item">
                    <img src={banner2} alt="" />
                </div>
                <div className="banner__item">
                    <img src={banner3} alt="" />
                </div>
                <div className="banner__item">
                    <img src={banner4} alt="" />
                </div>
            </Slider>
        </div>
    )
}

export default Banner

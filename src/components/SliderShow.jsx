import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Button from './Button'

const SliderShow = ({ products }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        autoplay: true,
        initialSlide: 0,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1240,
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
        <div className="slider-show">
            <Slider {...settings}>
                {products &&
                    products.map((prod) => (
                        <div className="slider-show__item" key={prod.id}>
                            <Link to={`products/${prod.id}`}>
                                <img src={prod.images[0]} alt="" />
                                <p className="slider-show__name">{prod.name}</p>
                                <p className="slider-show__price">{prod.price.toLocaleString()} VNĐ</p>
                            </Link>
                            <div className="slider-show__btn">
                                <Button size="sm" icon="bx bx-cart" animation={true}>
                                    Mua ngay
                                </Button>
                            </div>
                        </div>
                    ))}
            </Slider>
        </div>
    )
}

export default SliderShow

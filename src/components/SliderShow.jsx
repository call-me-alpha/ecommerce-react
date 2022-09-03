import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { useDispatch } from 'react-redux'
import ReactLoading from 'react-loading'

import { set } from '../redux/productModalSlice'
import Button from './Button'

const SliderShow = ({ products }) => {
    const dispatch = useDispatch()

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
                {products ? (
                    products.map((prod) => (
                        <div className="slider-show__item" key={prod.id}>
                            <Link to={`products/${prod.id}`}>
                                <img src={prod.images[0]} alt="" />
                                <p className="slider-show__name">{prod.name}</p>
                                <p className="slider-show__price">{prod.price.toLocaleString()} VNĐ</p>
                            </Link>
                            <div className="slider-show__btn">
                                <Button
                                    size="sm"
                                    icon="bx bx-cart"
                                    animation={true}
                                    onClick={() => dispatch(set(prod.id))}
                                >
                                    Mua ngay
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="loading">
                        <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                    </div>
                )}
            </Slider>
        </div>
    )
}

export default SliderShow

import PropTypes from 'prop-types'
import Slider from 'react-slick'

const ProductView = ({ product }) => {
    const { id, images, name, colors, sizes, desc, tag, price } = product
    console.log(id, images, name, colors, sizes, desc, tag, price)
    const settings = {
        customPaging: function (i) {
            return (
                <div>
                    <img src={images[0]} />
                </div>
            )
        },
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <div className="product-view">
            <Slider {...settings}>
                {images &&
                    images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt="" />
                        </div>
                    ))}
            </Slider>
            <div className="product-view__info"> {name}</div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object.isRequired
}

export default ProductView

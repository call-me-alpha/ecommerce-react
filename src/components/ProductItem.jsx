import { Link } from 'react-router-dom'

import Button from './Button'

const ProductItem = ({ product }) => {
    const { id, images, name, price } = product
    return (
        <div className="product-item">
            <Link to={`/products/${id}`}>
                <div className="product-item__image">
                    <img src={images[0]} alt="" />
                    <img src={images[2]} alt="" />
                </div>
                <h3 className="product-item__name">{name}</h3>
                <div className="product-item__price">{price.toLocaleString()} VNĐ</div>
            </Link>
            <div className="product-item__btn">
                <Button size="sm" icon="bx bx-cart" animation={true}>
                    Mua ngay
                </Button>
            </div>
        </div>
    )
}

export default ProductItem

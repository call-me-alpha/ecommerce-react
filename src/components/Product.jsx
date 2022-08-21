import React from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'

const Product = ({ product }) => {
    const { images, name, price } = product
    return (
        <div className="product">
            <Link to="/">
                <div className="product__image">
                    <img src={images[0]} alt="" />
                    <img src={images[2]} alt="" />
                </div>
                <h3 className="product__name">{name}</h3>
                <div className="product__price">{price.toLocaleString()} VNĐ</div>
            </Link>
            <div className="product__btn">
                <Button size="sm" icon="bx bx-cart" animation={true}>
                    Mua ngay
                </Button>
            </div>
        </div>
    )
}

export default Product

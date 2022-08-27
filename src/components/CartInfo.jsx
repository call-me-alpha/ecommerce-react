import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Button from '../components/Button'
import CartItem from '../components/CartItem'

const CartInfo = ({ cartItems }) => {
    const [totalProd, setTotalProd] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setTotalProd(cartItems.reduce((total, item) => total + item.quantity, 0))
        setTotalPrice(cartItems.reduce((total, item) => total + item.price * item.quantity, 0))
    }, [cartItems])

    return (
        <div className="cart">
            <div className="cart__info">
                <div className="cart__info__text">
                    <p>Bạn đang có {totalProd} sản phẩm trong giỏ hàng</p>
                    <div className="cart__info__text__price">
                        <span>Thành tiền</span>
                        <span>{totalPrice.toLocaleString()} VNĐ</span>
                    </div>
                </div>
                <div className="cart__info__btn">
                    <Button size="full">Đặt hàng</Button>
                    <Link to="/products">
                        <Button size="full">Tiếp tục mua hàng</Button>
                    </Link>
                </div>
            </div>
            <div className="cart__list">
                {cartItems.length ? (
                    cartItems.map((item, index) => <CartItem item={item} key={index}></CartItem>)
                ) : (
                    <div>Chưa có sản phẩm nào trong giỏ hàng</div>
                )}
            </div>
        </div>
    )
}

export default CartInfo

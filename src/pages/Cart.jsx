import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Helmet from '../components/Helmet'
import PolicyItem from '../components/PolicyItem'
import Section, { SectionBody } from '../components/Section'
import Button from '../components/Button'
import CartItem from '../components/CartItem'

const Cart = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const cartItems = useSelector((state) => state.cart.value)
    const [totalProd, setTotalProd] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setTotalProd(cartItems.reduce((total, item) => total + item.quantity, 0))
        setTotalPrice(cartItems.reduce((total, item) => total + item.price * item.quantity, 0))
    }, [cartItems])
    return (
        <Helmet title="Giỏ hàng">
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
                        <div className="cart__no-item">Bạn chưa có sản phẩm nào trong giỏ hàng để hiển thị</div>
                    )}
                </div>
            </div>
            <Section>
                <SectionBody>
                    <PolicyItem />
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Cart

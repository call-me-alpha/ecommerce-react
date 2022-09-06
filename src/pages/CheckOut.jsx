import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import { format } from 'date-fns'

import Helmet from '../components/Helmet'
import PolicyItem from '../components/PolicyItem'
import Section, { SectionBody } from '../components/Section'
import Button from '../components/Button'
import orderApi from '../api/orderApi'
import { toast } from 'react-toastify'
import { remove } from '../redux/cartSlice'

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const user = useSelector((state) => state.user.currentUser)
    const cartItems = useSelector((state) => state.cart.value)

    const [totalProd, setTotalProd] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const [custId, setCustId] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    useEffect(() => {
        if (user) {
            setCustId(user.id)
            setName(user.name)
            setEmail(user.email)
        }
    }, [user])
    useEffect(() => {
        setTotalProd(cartItems.reduce((total, item) => total + item.quantity, 0))
        setTotalPrice(cartItems.reduce((total, item) => total + item.price * item.quantity, 0))
    }, [cartItems])

    const handelSubmit = (e) => {
        e.preventDefault()
        const total = totalPrice >= 500000 ? totalPrice : totalPrice + 50000
        // const today = new Date()
        // const careteAt = `${today.getHours()}:${today.getUTCMinutes()} ${today.getDate()}/${
        //     today.getMonth() + 1
        // }/${today.getFullYear()}`
        const createdAt = format(new Date(), 'HH:mm MM/dd/yyyy')
        const formData = {
            id: v4(),
            custId,
            name,
            phone,
            email,
            address,
            cartItems,
            totalProd,
            totalPrice: total,
            createdAt,
            status: 'pendding'
        }
        const createOrderServer = async (data) => {
            await orderApi.create(data)
            toast.success('Đặt hàng thành công !')
        }
        createOrderServer(formData)
        setTimeout(() => {
            dispatch(remove())
            navigate('/myorder')
        }, 2000)
    }

    return (
        <Helmet title="Thanh toán">
            <div className="checkout">
                <div className="checkout__left">
                    <h3 className="checkout__left__title">Thông tin giao hàng</h3>
                    <form onSubmit={(e) => handelSubmit(e)}>
                        <div className="checkout__left__form-group">
                            <label htmlFor="name">Họ tên:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Họ tên..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="checkout__left__form-group">
                            <label htmlFor="phone">Số điện thoại:</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Số điện thoại..."
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="checkout__left__form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="checkout__left__form-group">
                            <label htmlFor="address">Địa chỉ:</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Địa chỉ..."
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <h3 style={{ marginTop: '20px' }} className="checkout__left__title">
                            Phương thức thanh toán
                        </h3>
                        <div className="checkout__left__pay">
                            <input type="radio" defaultChecked />
                            <span>Thanh toán khi nhận hàng</span>
                        </div>

                        {user ? (
                            <div className="checkout__left__btn">
                                <Button size="full">Hoàn tất đơn hàng</Button>
                            </div>
                        ) : (
                            <div className="checkout__left__btn">
                                <span>Vui lòng đăng nhập để có thể đặt hàng và theo dõi đơn hàng</span>
                                <Link to="/login">
                                    <span>Đăng nhập</span>
                                </Link>
                            </div>
                        )}
                    </form>
                </div>
                <div className="checkout__right">
                    <div className="checkout__right__info">
                        {cartItems.map((item, index) => (
                            <div className="cart__item" key={index}>
                                <div className="cart__item__image checkout__right__info__img">
                                    <img src={item.product.images[0]} alt="" />
                                </div>
                                <div className="cart__item__info">
                                    <div className="cart__item__info__name">
                                        <Link
                                            to={`/products/${item.id}`}
                                        >{`${item.product.name} - ${item.color} - ${item.size}`}</Link>
                                    </div>
                                    <div className="cart__item__info__quantity">Số lượng: {item.quantity}</div>
                                    <div className="cart__item__info__price">
                                        {item.product.price.toLocaleString()} VNĐ
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="checkout__right__total">
                        <div className="checkout__right__total__item">
                            <span className="checkout__right__total__item__title">Tạm tính: </span>
                            <span className="checkout__right__total__item__price">
                                {totalPrice.toLocaleString()} VNĐ
                            </span>
                        </div>
                        <div className="checkout__right__total__item">
                            <span className="checkout__right__total__item__title">Phí vận chuyển: </span>
                            <span className="checkout__right__total__item__about">
                                (Miễn phí vận chuyển cho đơn hàng từ 500.000 VNĐ)
                            </span>
                            <span className="checkout__right__total__item__price">
                                {totalPrice >= 500000 ? 0 : '50.000'} VNĐ
                            </span>
                        </div>
                        <div className="checkout__right__total__item">
                            <span className="checkout__right__total__item__title">Cần thanh toán: </span>
                            <span className="checkout__right__total__item__price">
                                {totalPrice >= 500000
                                    ? totalPrice.toLocaleString()
                                    : (totalPrice + 50000).toLocaleString()}
                                VNĐ
                            </span>
                        </div>
                    </div>
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

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
            toast.success('?????t h??ng th??nh c??ng !')
        }
        createOrderServer(formData)
        setTimeout(() => {
            dispatch(remove())
            navigate('/myorder')
        }, 2000)
    }

    return (
        <Helmet title="Thanh to??n">
            <div className="checkout">
                <div className="checkout__left">
                    <h3 className="checkout__left__title">Th??ng tin giao h??ng</h3>
                    <form onSubmit={(e) => handelSubmit(e)}>
                        <div className="checkout__left__form-group">
                            <label htmlFor="name">H??? t??n:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="H??? t??n..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="checkout__left__form-group">
                            <label htmlFor="phone">S??? ??i???n tho???i:</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="S??? ??i???n tho???i..."
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
                            <label htmlFor="address">?????a ch???:</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="?????a ch???..."
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <h3 style={{ marginTop: '20px' }} className="checkout__left__title">
                            Ph????ng th???c thanh to??n
                        </h3>
                        <div className="checkout__left__pay">
                            <input type="radio" defaultChecked />
                            <span>Thanh to??n khi nh???n h??ng</span>
                        </div>

                        {user ? (
                            <div className="checkout__left__btn">
                                <Button size="full">Ho??n t???t ????n h??ng</Button>
                            </div>
                        ) : (
                            <div className="checkout__left__btn">
                                <span>Vui l??ng ????ng nh???p ????? c?? th??? ?????t h??ng v?? theo d??i ????n h??ng</span>
                                <Link to="/login">
                                    <span>????ng nh???p</span>
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
                                    <div className="cart__item__info__quantity">S??? l?????ng: {item.quantity}</div>
                                    <div className="cart__item__info__price">
                                        {item.product.price.toLocaleString()} VN??
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="checkout__right__total">
                        <div className="checkout__right__total__item">
                            <span className="checkout__right__total__item__title">T???m t??nh: </span>
                            <span className="checkout__right__total__item__price">
                                {totalPrice.toLocaleString()} VN??
                            </span>
                        </div>
                        <div className="checkout__right__total__item">
                            <span className="checkout__right__total__item__title">Ph?? v???n chuy???n: </span>
                            <span className="checkout__right__total__item__about">
                                (Mi???n ph?? v???n chuy???n cho ????n h??ng t??? 500.000 VN??)
                            </span>
                            <span className="checkout__right__total__item__price">
                                {totalPrice >= 500000 ? 0 : '50.000'} VN??
                            </span>
                        </div>
                        <div className="checkout__right__total__item">
                            <span className="checkout__right__total__item__title">C???n thanh to??n: </span>
                            <span className="checkout__right__total__item__price">
                                {totalPrice >= 500000
                                    ? totalPrice.toLocaleString()
                                    : (totalPrice + 50000).toLocaleString()}
                                VN??
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

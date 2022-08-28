import { useEffect, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import logo from '../assets/images/logos/logo.png'
import Button from './Button'
import { removeItem } from '../redux/cartSlice'

const mainNav = [
    {
        display: 'Trang chủ',
        path: '/'
    },
    {
        display: 'Sản phẩm',
        path: '/products'
    },
    {
        display: 'Giới thiệu',
        path: '/about'
    },
    {
        display: 'Liên hệ',
        path: '/contact'
    }
]
const Header = () => {
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex((item) => item.path === pathname)
    const headerRef = useRef()
    const menuRef = useRef()
    const cartRef = useRef()

    const cartItems = useSelector((state) => state.cart.value)

    useEffect(() => {
        const handelScroll = () => {
            document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
                ? headerRef.current.classList.add('shink')
                : headerRef.current.classList.remove('shink')
        }
        window.addEventListener('scroll', handelScroll)
        return () => {
            window.removeEventListener('scroll', handelScroll)
            cartToggle()
        }
    }, [])

    const { countItem, totalPrice } = useMemo(() => {
        const countItem = cartItems.reduce((total, item) => total + item.quantity, 0)
        const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        return { countItem, totalPrice }
    }, [cartItems])

    const menuToggle = () => menuRef.current.classList.toggle('active')
    const cartToggle = () => cartRef.current.classList.toggle('active')
    return (
        <header className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className="bx bx-menu"></i>
                    </div>
                    <div className="header__menu__left" ref={menuRef}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className="bx bx-chevron-left"></i>
                        </div>
                        {mainNav.map((item, index) => (
                            <div
                                className={`header__menu__item header__menu__left__item ${
                                    index === activeNav ? 'active' : ''
                                }`}
                                key={index}
                                onClick={menuToggle}
                            >
                                <Link to={item.path}>
                                    <span>{item.display}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item" onClick={cartToggle}>
                            <i className="bx bx-cart header__menu__right__item__cart">
                                <div className="header__menu__right__item__cart__count">
                                    <span>{countItem}</span>
                                </div>
                            </i>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bx-user-circle"></i>
                        </div>
                    </div>
                    <div className="header__menu__cart" ref={cartRef} onClick={cartToggle}>
                        <div className="header__menu__cart__content">
                            {cartItems.length ? (
                                cartItems.map((item, index) => (
                                    <div className="cart-toggle__item" key={index}>
                                        <div className="cart-toggle__item__image">
                                            <img src={item.product.images[0]} alt="" />
                                        </div>
                                        <div className="cart-toggle__item__info">
                                            <div className="cart-toggle__item__info__name">
                                                <Link
                                                    to={`/products/${item.id}`}
                                                    onClick={cartToggle}
                                                >{`${item.product.name} - ${item.color} - ${item.size}`}</Link>
                                            </div>
                                            <div className="cart-toggle__item__info__price">
                                                {item.product.price.toLocaleString()} VNĐ
                                            </div>
                                            <div
                                                className="cart-toggle__item__info__action"
                                                onClick={() => {
                                                    dispatch(removeItem(item))
                                                    toast.success('Xoá sản phẩm thành công !')
                                                }}
                                            >
                                                <i className="bx bx-trash"></i>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="cart__no-item">Bạn chưa có sản phẩm nào trong giỏ hàng để hiển thị</div>
                            )}
                            <div className="cart__info__text__price" style={{ marginBottom: '12px' }}>
                                <span>Thành tiền</span>
                                <span style={{ fontSize: ' 2rem' }}>{totalPrice.toLocaleString()} VNĐ</span>
                            </div>
                            <Link to="/cart">
                                <Button size="full" onClick={cartToggle}>
                                    Đi đến giỏ hàng
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

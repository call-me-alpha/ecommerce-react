import { useEffect, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import logo from '../assets/images/logos/logo.png'
import Button from './Button'

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
    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex((item) => item.path === pathname)
    const headerRef = useRef()
    const menuRef = useRef()
    const cartRef = useRef()

    const cartItems = useSelector((state) => state.cart.value)
    console.log(cartItems)

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

    const countItem = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems])

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
                    <div className="header__menu__cart" ref={cartRef}>
                        <div className="header__menu__cart__content">
                            <Link to="/cart">
                                <Button onClick={cartToggle}>Đi đến giỏ hàng</Button>
                            </Link>
                            <div className="header__menu__cart__content__btn" onClick={cartToggle}>
                                <i className="bx bx-right-arrow-alt"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

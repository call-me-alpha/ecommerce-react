import { Link, useLocation } from 'react-router-dom'

import logo from '../assets/images/logo.png'

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
        display: 'Liên hệ',
        path: '/contact'
    },
    {
        display: 'Giới thiệu',
        path: '/about'
    }
]
const Header = () => {
    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex((item) => item.path === pathname)

    return (
        <div className="header">
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle">
                        <i className="bx bx-menu"></i>
                    </div>
                    <div className="header__menu__left">
                        <div className="header__menu__left__close">
                            <i className="bx bx-chevron-left"></i>
                        </div>
                        {mainNav.map((item, index) => (
                            <div
                                className={`header__menu__item header__menu__left__item ${
                                    index === activeNav ? 'active' : ''
                                }`}
                                key={index}
                            >
                                <Link to={item.path}>
                                    <span>{item.display}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bx-search"></i>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="bx bx-cart"></i>
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bx-user-circle"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

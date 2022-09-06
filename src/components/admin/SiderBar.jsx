import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import logo from '../../assets/images/logos/logo.png'
import { auth } from '../../firebase/config'
import { logOut } from '../../redux/userSlice'

const siderBars = [
    {
        display: 'Dashboard',
        path: '/admin',
        icon: 'bx bxs-dashboard'
    },
    {
        display: 'Người dùng',
        path: 'customers',
        icon: 'bx bxs-user-pin'
    },
    {
        display: 'Danh mục',
        path: 'categories',
        icon: 'bx bxs-category'
    },
    {
        display: 'Sản phẩm',
        path: 'products',
        icon: 'bx bxs-package'
    },
    {
        display: 'Đơn hàng',
        path: 'orders',
        icon: 'bx bxs-cart-alt'
    }
]
const SiderBarItem = (props) => {
    const active = props.active ? 'active' : ''
    return (
        <div className="sidebar__item">
            <div className={`sidebar__item__inner ${active}`}>
                <i className={props.icon}></i>
                <span>{props.display}</span>
            </div>
        </div>
    )
}

const SiderBar = ({ sideBarRef }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handelLogout = () => {
        auth.signOut()
        dispatch(logOut())
        navigate('/')
        toast.success('Đăng xuất thành công !')
    }
    const { pathname } = useLocation()
    const activeItem = () => {
        const check = siderBars.findIndex((item) => pathname.split('/')[2] === item.path)
        return check === -1 ? 0 : check
    }
    const handelToggle = () => {
        sideBarRef.current.classList.toggle('active')
    }
    return (
        <div className="sidebar" ref={sideBarRef}>
            <div className="sidebar__logo">
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
            </div>
            {siderBars.map((item, index) => (
                <Link to={item.path} key={index} onClick={handelToggle}>
                    <SiderBarItem display={item.display} icon={item.icon} active={index === activeItem()} />
                </Link>
            ))}
            <div className="sidebar__close" onClick={handelToggle}>
                <i className="bx bx-arrow-back"></i>
            </div>
            <div className="sidebar__logout" onClick={handelLogout}>
                <i className="bx bx-log-out-circle"></i>
                <span>Đăng xuất</span>
            </div>
        </div>
    )
}

export default SiderBar

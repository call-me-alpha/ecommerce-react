import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Toggle from 'react-toggle'

const TopNav = ({ handelToggle }) => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const [user, setUser] = useState(currentUser)
    const topnavRef = useRef()
    useEffect(() => {
        setUser(currentUser)
    }, [currentUser])
    useEffect(() => {
        const handelScroll = () => {
            document.body.scrollTop >= 20 || document.documentElement.scrollTop >= 20
                ? topnavRef.current.classList.add('shink')
                : topnavRef.current.classList.remove('shink')
        }
        window.addEventListener('scroll', handelScroll)
        return () => {
            window.removeEventListener('scroll', handelScroll)
        }
    }, [])
    return (
        <div className="topnav" ref={topnavRef}>
            <div className="topnav__toggle-sidebar" onClick={handelToggle}>
                <i className="bx bx-menu"></i>
            </div>
            <div className="topnav__search">
                <input type="text" placeholder="Bạn muốn tìm kiếm gì..." />
                <i className="bx bx-search"></i>
            </div>
            <div className="topnav__right">
                <label>
                    <Toggle
                        className="topnav__right__toggle-theme"
                        icons={{
                            checked: <i className="bx bxs-moon"></i>,
                            unchecked: <i className="bx bx-sun"></i>
                        }}
                    />
                </label>
                <div className="topnav__right__user">
                    <span>{user.name}</span>
                    <img src={user.avatar} alt="" />
                </div>
            </div>
        </div>
    )
}

export default TopNav

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Toggle from 'react-toggle'

const TopNav = ({ handelToggle }) => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const [user, setUser] = useState(currentUser)
    useEffect(() => {
        setUser(currentUser)
    }, [currentUser])
    return (
        <div className="topnav">
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

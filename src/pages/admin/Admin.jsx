import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import SliderBar from '../../components/admin/SiderBar'
import TopNav from '../../components/admin/TopNav'

const Admin = () => {
    const navigate = useNavigate()
    const sideBarRef = useRef()
    const handelToggle = () => {
        sideBarRef.current.classList.toggle('active')
    }
    const user = useSelector((state) => state.user.currentUser)
    const [currentUser, setCurrentUser] = useState(user)
    useEffect(() => {
        setCurrentUser(user)
    }, [user])
    useEffect(() => {
        if (currentUser?.role !== 'admin') {
            navigate('/')
        }
    }, [currentUser?.role, navigate])
    return (
        <div className="layout">
            <SliderBar sideBarRef={sideBarRef} />
            <div className="layout__content ">
                <ToastContainer
                    style={{
                        fontSize: '1.4rem'
                    }}
                    autoClose={3000}
                />
                <TopNav handelToggle={handelToggle} />
                <div className="layout__content__main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin

import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import SliderBar from '../../components/admin/SiderBar'
import TopNav from '../../components/admin/TopNav'

const Admin = () => {
    const sideBarRef = useRef()
    const handelToggle = () => {
        sideBarRef.current.classList.toggle('active')
    }
    const user = useSelector((state) => state.user.currentUser)
    console.log(user)
    if (user.role !== 'admin') {
        return <Navigate to="/" />
    }
    return (
        <div className="layout theme-mode-dark">
            <SliderBar sideBarRef={sideBarRef} />
            <div className="layout__content ">
                <TopNav handelToggle={handelToggle} />
                <div className="layout__content__main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin

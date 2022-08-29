import { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import SliderBar from '../../components/admin/SiderBar'
import TopNav from '../../components/admin/TopNav'

const Admin = () => {
    const sideBarRef = useRef()
    const handelToggle = () => {
        sideBarRef.current.classList.toggle('active')
    }
    return (
        <div className="layout">
            <SliderBar sideBarRef={sideBarRef} />
            <div className="layout__content">
                <TopNav handelToggle={handelToggle} />
                <div className="layout__content__main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin

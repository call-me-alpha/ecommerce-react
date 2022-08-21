import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import GoToTop from './GoToTop'

const Layout = () => {
    return (
        <div>
            <GoToTop />
            <Header />
            <div className="container">
                <div className="main">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout

import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import GoToTop from './GoToTop'

const Layout = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="main">
                    <Outlet />
                </div>
            </div>
            <GoToTop />
            <Footer />
        </div>
    )
}

export default Layout

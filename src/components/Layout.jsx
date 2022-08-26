import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Header from './Header'
import Footer from './Footer'
import GoToTop from './GoToTop'
import ProductViewModal from './ProductViewModal'

const Layout = () => {
    return (
        <div>
            <Header />
            <ToastContainer
                style={{
                    fontSize: '1.4rem'
                }}
                autoClose={3000}
            />
            <div className="container">
                <div className="main">
                    <Outlet />
                </div>
            </div>
            <GoToTop />
            <ProductViewModal />
            <Footer />
        </div>
    )
}

export default Layout

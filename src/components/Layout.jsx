import { BrowserRouter } from 'react-router-dom'

import Routers from '../routes/Routes'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
    return (
        <BrowserRouter>
            <Header />
            <div className="container">
                <div className="main">
                    <Routers />
                </div>
            </div>
            <Footer />
        </BrowserRouter>
    )
}

export default Layout

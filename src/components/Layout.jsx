import { BrowserRouter } from 'react-router-dom'

import Routers from '../routes/Routes'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <div className="container">
                    <div className="main">
                        <Routers />
                    </div>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default Layout

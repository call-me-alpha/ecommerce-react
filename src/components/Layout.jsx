import { BrowserRouter } from 'react-router-dom'

import Routers from '../routes/Routes'

const Layout = () => {
    return (
        <BrowserRouter>
            <Routers />
        </BrowserRouter>
    )
}

export default Layout

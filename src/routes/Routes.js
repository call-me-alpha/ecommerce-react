import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Products from '../pages/Products'
import Product from '../pages/Product'

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:slug" element={<Product />} />
            <Route path="/products" element={<Products />} />
        </Routes>
    )
}

export default Routers

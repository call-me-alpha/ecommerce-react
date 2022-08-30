import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Products from '../pages/Products'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Layout from '../components/Layout'
import ProductDetail from '../pages/ProductDetail'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

import Admin from '../pages/admin/Admin'
import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import Customer from '../pages/admin/Customer'
import Order from '../pages/admin/Order'

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="about" element={<About />} />
                <Route path="cart" element={<Cart />} />
                <Route path="products/:id" element={<ProductDetail />} />
                <Route path="products" element={<Products />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/admin" element={<Admin />}>
                <Route index element={<Dashboard />} />
                <Route path="categories" element={<Category />} />
                <Route path="products" element={<Product />} />
                <Route path="customers" element={<Customer />} />
                <Route path="orders" element={<Order />} />
            </Route>
        </Routes>
    )
}

export default Routers

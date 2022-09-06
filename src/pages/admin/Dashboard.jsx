import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { useDispatch, useSelector } from 'react-redux'

import Helmet from '../../components/Helmet'
import Grid from '../../components/Grid'
import StatisticalItem from '../../components/admin/StatisticalItem'
import { useEffect, useMemo, useState } from 'react'
import userApi from '../../api/userApi'
import Badge from '../../components/admin/Badge'
import { getProductsThunk } from '../../redux/productSlice'
import { getOrdersThunk } from '../../redux/orderSlice'

const Dashboard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductsThunk())
        dispatch(getOrdersThunk())
    }, [dispatch])

    const prodList = useSelector((state) => state.product.products)
    const orderList = useSelector((state) => state.order.orders)
    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    useEffect(() => {
        setProducts(prodList)
    }, [prodList])
    useEffect(() => {
        setOrders(orderList)
    }, [orderList])

    const countCust = useMemo(() => customers.length, [customers])
    const countProd = useMemo(() => products.length, [products])
    const countOrder = useMemo(() => orders.length, [orders])
    const totalPrice = useMemo(() => {
        const revenue = orders.filter((item) => item.status === 'successful')
        return revenue.reduce((total, curr) => total + curr.totalPrice, 0)
    }, [orders])

    const statisticals = [
        {
            icon: 'bx bxs-user-pin',
            count: countCust,
            title: 'Tổng khách hàng'
        },
        {
            icon: 'bx bxs-package',
            count: countProd,
            title: 'Tổng sản phẩm'
        },
        {
            icon: 'bx bxs-cart-alt',
            count: countOrder,
            title: 'Tổng đơn hàng'
        },
        {
            icon: 'bx bx-dollar-circle',
            count: `${totalPrice.toLocaleString()}`,
            title: 'Doanh thu'
        }
    ]
    useEffect(() => {
        const getCustoterServer = async () => {
            try {
                const res = await userApi.getAll()
                setCustomers(res)
            } catch (err) {
                console.log(err)
            }
        }

        getCustoterServer()
    }, [])

    const ordersNew = useMemo(() => {
        let temp = []
        if (orders[0]?.createdAt) {
            temp = orders.slice(0, 6).sort((a, b) => b.createdAt.localeCompare(a.careteAt))
        }
        return temp
    }, [orders])
    return (
        <Helmet title="Dashboard">
            <div className="dashboard">
                <div className="dashboard__title">Dashboard</div>
                <div className="dashboard__statistical">
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {statisticals.map((item, index) => (
                            <StatisticalItem key={index} title={item.title} icon={item.icon} count={item.count} />
                        ))}
                    </Grid>
                </div>
                <div className="dashboard__table">
                    <Grid col={2} mdCol={1} smCol={1} gap={20}>
                        <div className="dashboard__table__item">
                            <div className="dashboard__table__item__title">Khách hàng mới</div>
                            {customers.length ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Avatar</th>
                                            <th>Tên</th>
                                            <th>Email</th>
                                            <th>Vai trò</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.slice(0, 5).map((cust) => (
                                            <tr key={cust.id}>
                                                <td>
                                                    <img src={cust.avatar} alt="" />
                                                </td>
                                                <td>{cust.name}</td>
                                                <td>{cust.email}</td>
                                                <td>
                                                    <Badge status={cust.role} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="loading">
                                    <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                                </div>
                            )}
                            <div className="dashboard__table__item__link">
                                <Link to="customers">Xem tất cả</Link>
                            </div>
                        </div>
                        <div className="dashboard__table__item">
                            <div className="dashboard__table__item__title">Đơn hàng mới</div>
                            {ordersNew.length ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Người đặt</th>
                                            <th>Thời gian</th>
                                            <th>Tổng đơn hàng</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ordersNew.map((order, index) => (
                                            <tr key={index}>
                                                <td>{order.name}</td>
                                                <td>{order.createdAt}</td>
                                                <td>{order.totalPrice.toLocaleString()} VNĐ</td>
                                                <td>
                                                    <Badge status={order.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="loading">
                                    <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                                </div>
                            )}
                            <div className="dashboard__table__item__link">
                                <Link to="orders">Xêm tất cả</Link>
                            </div>
                        </div>
                    </Grid>
                </div>
            </div>
        </Helmet>
    )
}

export default Dashboard

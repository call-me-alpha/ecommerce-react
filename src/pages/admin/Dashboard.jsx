import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { useDispatch, useSelector } from 'react-redux'

import Helmet from '../../components/Helmet'
import Grid from '../../components/Grid'
import StatisticalItem from '../../components/admin/StatisticalItem'
import { useEffect, useMemo, useState } from 'react'
import userApi from '../../api/userApi'
import orderApi from '../../api/orderApi'
import Badge from '../../components/admin/Badge'
import { getProductsThunk } from '../../redux/productSlice'

const Dashboard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductsThunk())
    }, [dispatch])

    const prodList = useSelector((state) => state.product.products)
    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    useEffect(() => {
        setProducts(prodList)
    }, [prodList])

    const countCust = useMemo(() => customers.length, [customers])
    const countProd = useMemo(() => products.length, [products])

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
            count: '$2,632',
            title: 'Tổng đơn hàng'
        },
        {
            icon: 'bx bx-dollar-circle',
            count: '1,711',
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
        const getOrderServer = async () => {
            try {
                const res = await orderApi.getAll()
                setOrders(res)
            } catch (err) {
                console.log(err)
            }
        }
        getCustoterServer()
        getOrderServer()
    }, [])

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
                            {orders.length ? (
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
                                        {orders.slice(0, 5).map((order, index) => (
                                            <tr key={index}>
                                                <td>{order.name}</td>
                                                <td>{order.createdAt}</td>
                                                <td>{order.totalPrice}</td>
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

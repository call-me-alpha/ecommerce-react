import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import orderApi from '../api/orderApi'
import Helmet from '../components/Helmet'
import PolicyItem from '../components/PolicyItem'
import Section, { SectionBody } from '../components/Section'
import Badge from '../components/admin/Badge'
import Button from '../components/Button'
import OrderViewModal from '../components/OrderViewModal'
import { getOrdersThunk } from '../redux/orderSlice'

function MyOrder() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrdersThunk())
    }, [dispatch])
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const user = useSelector((state) => state.user.currentUser)
    const orderList = useSelector((state) => state.order.orders)
    const [orders, setOrders] = useState([])
    const [curentUser, setCurentUser] = useState({})
    const [order, setOrder] = useState()
    const [viewModal, setViewModal] = useState('')

    const toggleViewModal = () => {
        setViewModal((prev) => (prev === 'active' ? '' : 'active'))
    }

    useEffect(() => {
        setOrders(orderList)
    }, [orderList])
    useEffect(() => {
        setCurentUser(user)
    }, [user])
    if (user === null) {
        navigate('/')
    }
    const myOrders = useMemo(() => {
        let temp
        if (orders && curentUser) {
            temp = orders.filter((item) => item.custId === curentUser.id)
        }
        return temp.sort((a, b) => b.createdAt.localeCompare(a.careteAt))
    }, [orders, curentUser])

    const handelView = (id) => {
        const getOrderServer = async (id) => {
            const res = await orderApi.getOne(id)
            setOrder(res)
            toggleViewModal()
        }
        getOrderServer(id)
    }
    return (
        <Helmet title="Đơn hàng của tôi">
            {myOrders.length > 0 ? (
                <div className="myorder">
                    <div className="myorder__title">Đơn hàng của bạn</div>
                    <div className="myorder__list">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tổng sản phẩm</th>
                                    <th>Tổng tiền</th>
                                    <th>Ngày đặt</th>
                                    <th>Trạng thái</th>
                                    <th>Xem chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myOrders.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.totalProd}</td>
                                        <td>{item.totalPrice.toLocaleString()} VNĐ</td>
                                        <td>{item.createdAt}</td>
                                        <td>
                                            <Badge status={item.status} />
                                        </td>
                                        <td onClick={() => handelView(item.id)}>
                                            <span className="myorder__list__btn">Xem chi tiết</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="myorder-noitem">
                    <div>Bạn chưa có đơn hàng nào</div>
                    <Link to="/products">
                        <Button>Tiếp tục mua sắm</Button>
                    </Link>
                </div>
            )}
            <Section>
                <SectionBody>
                    <PolicyItem />
                </SectionBody>
            </Section>
            <OrderViewModal viewModal={viewModal} toggleViewModal={toggleViewModal} order={order} />
        </Helmet>
    )
}

export default MyOrder

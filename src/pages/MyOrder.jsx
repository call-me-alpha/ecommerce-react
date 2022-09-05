import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import orderApi from '../api/orderApi'
import Helmet from '../components/Helmet'
import PolicyItem from '../components/PolicyItem'
import Section, { SectionBody } from '../components/Section'
import Badge from '../components/admin/Badge'
import Button from '../components/Button'
import OrderViewModal from '../components/OrderViewModal'

function MyOrder() {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const user = useSelector((state) => state.user.currentUser)
    const [orders, setOrders] = useState([])
    const [curentUser, setCurentUser] = useState({})

    const [viewModal, setViewModal] = useState('')

    const toggleViewModal = () => {
        setViewModal((prev) => (prev === 'active' ? '' : 'active'))
    }
    useEffect(() => {
        const getOrderServer = async () => {
            const res = await orderApi.getAll()
            setOrders(res)
        }
        getOrderServer()
    }, [])
    useEffect(() => {
        setCurentUser(user)
    }, [user])
    if (user === null) {
        navigate('/')
    }
    const myOrders = useMemo(() => {
        if (orders && curentUser) {
            return orders.filter((item) => item.custId === curentUser.id)
        }
    }, [orders, curentUser])

    console.log(viewModal)
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
                                        <td onClick={toggleViewModal}>
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
            <OrderViewModal viewModal={viewModal} toggleViewModal={toggleViewModal} />
        </Helmet>
    )
}

export default MyOrder

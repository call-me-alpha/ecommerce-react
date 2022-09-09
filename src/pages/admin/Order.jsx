import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading'

import orderApi from '../../api/orderApi'
import Helmet from '../../components/Helmet'
import { getOrdersThunk } from '../../redux/orderSlice'
import Table from '../../components/admin/Table'
import Badge from '../../components/admin/Badge'
import ViewOrderModal from '../../components/admin/ViewOrderModal'

const headData = ['Người đặt', 'Tổng sản phẩm', 'Tổng tiền', 'Ngày đặt', 'Trạng thái', 'Thao tác']
const renderHead = (item, index) => <th key={index}>{item}</th>
const renderBody = (item, index, handelViewModal) => (
    <tr key={index}>
        <td>{item.name}</td>
        <td>{item.totalProd}</td>
        <td>{item.totalPrice.toLocaleString()} VNĐ</td>
        <td>{item.createdAt}</td>
        <td>
            <Badge status={item.status} />
        </td>
        <td>
            <span className="btn__view" onClick={() => handelViewModal(item.id)}>
                Xem chi tiết
            </span>
        </td>
    </tr>
)

const Order = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrdersThunk())
    }, [dispatch])

    const orderList = useSelector((state) => state.order.orders)
    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState({})
    const [viewModal, setViewModal] = useState('')
    const toggleViewModal = () => {
        setViewModal((prev) => (prev === 'active' ? '' : 'active'))
    }
    useEffect(() => {
        setOrders(orderList)
    }, [orderList])
    const handelViewModal = (id) => {
        const getOrderServer = async (id) => {
            const res = await orderApi.getOne(id)
            setOrder(res)
            toggleViewModal()
        }
        getOrderServer(id)
    }
    const ordersSort = useMemo(() => {
        let temp = []
        if (orders[0]?.createdAt) {
            temp = orders.slice(0, 6).sort((a, b) => b.createdAt.localeCompare(a.careteAt))
        }
        return temp
    }, [orders])

    return (
        <Helmet title="Quản lý đơn hàng">
            <div className="page">
                <div className="page__title">Quản lý đơn hàng</div>
                <div className="page__table">
                    {ordersSort.length > 0 ? (
                        <Table
                            limit={10}
                            headData={headData}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={ordersSort}
                            renderBody={(item, index) => renderBody(item, index, handelViewModal)}
                        />
                    ) : (
                        <div className="loading">
                            <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                        </div>
                    )}
                </div>
            </div>
            <ViewOrderModal display={viewModal} toggleViewModal={toggleViewModal} orderView={order} />
        </Helmet>
    )
}

export default Order

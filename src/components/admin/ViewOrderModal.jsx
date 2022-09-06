import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading'

import Badge from './Badge'
import Button from '../Button'
import { updateStatusThunk } from '../../redux/orderSlice'

const statusOptions = ['pendding', 'shipping', 'successful', 'canceled']

const ViewOrderModal = ({ display, toggleViewModal, orderView }) => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.category.loading)
    const [loading, setLoading] = useState(isLoading)

    const [order, setOrder] = useState()
    const [selectUpdate, setSelectUpdate] = useState('')
    const [status, setStatus] = useState('')
    const toggleUpdate = () => {
        setSelectUpdate((prev) => (prev === 'active' ? '' : 'active'))
    }
    useEffect(() => {
        setOrder(orderView)
        setStatus(orderView.status)
    }, [orderView])
    useEffect(() => {
        setLoading(isLoading)
    }, [isLoading])

    const handelUpdateStatus = (e) => {
        dispatch(updateStatusThunk({ id: order.id, status }))
        if (!loading) {
            toast.success('Cập nhật trạng thái thành công !')
            toggleUpdate()
        }
    }

    return (
        <div className={`modal-admin ${display}`}>
            <div className="modal-admin__content">
                <div className="modal-admin__content__title">
                    <h3>THÔNG TIN CHI TIẾT ĐƠN HÀNG</h3>
                </div>
                {order?.cartItems ? (
                    <div className="order-modal__content__body">
                        <div className="order-modal__content__body__info">
                            <div className="order-modal__content__body__info__item">
                                <h3 className="order-modal__content__body__info__item__title">Thông tin giao hàng</h3>
                                <div className="order-modal__content__body__info__item__about">
                                    <div className="order-modal__content__body__info__item__about__item">
                                        <span>Tên khách hàng: </span>
                                        <span>{order.name}</span>
                                    </div>
                                    <div className="order-modal__content__body__info__item__about__item">
                                        <span>Số điện thoại: </span>
                                        <span>{order.phone}</span>
                                    </div>
                                    <div className="order-modal__content__body__info__item__about__item">
                                        <span>Email: </span>
                                        <span>{order.email}</span>
                                    </div>
                                    <div className="order-modal__content__body__info__item__about__item">
                                        <span>Địa chỉ: </span>
                                        <span>{order.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="order-modal__content__body__info__item">
                                <h3 className="order-modal__content__body__info__item__title">Thông tin giỏ hàng</h3>
                                <div className="order-modal__content__body__info__item__about">
                                    <div className="order-modal__content__body__info__item__about__item">
                                        {order.cartItems.map((item, index) => (
                                            <div className="cart__item" key={index}>
                                                <div className="cart__item__image checkout__right__info__img">
                                                    <img src={item.product.images[0]} alt="" />
                                                </div>
                                                <div className="cart__item__info">
                                                    <div className="cart__item__info__name">
                                                        {item.product.name} - {item.color} - {item.size}
                                                    </div>
                                                    <div className="cart__item__info__quantity">
                                                        Số lượng: {item.quantity}
                                                    </div>
                                                    <div className="cart__item__info__price">
                                                        {item.product.price.toLocaleString()} VNĐ
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="order-modal__content__body__info__item__about__item">
                                        <span>Tổng sản phẩm: </span>
                                        <span>{order.totalProd}</span>
                                    </div>
                                    <div className="order-modal__content__body__info__item__about__item">
                                        <span>Tổng tiền: </span>
                                        <span>{order.totalPrice.toLocaleString()} VNĐ</span>
                                    </div>
                                    <div className="order-modal__content__body__info__item__about__item">
                                        <span>Trạng thái: </span>
                                        <span>
                                            <Badge status={order.status} />
                                        </span>
                                        {!selectUpdate ? (
                                            <span
                                                style={{
                                                    marginLeft: '8px',
                                                    color: '#f5801f',
                                                    cursor: 'pointer',
                                                    fontWeight: '600'
                                                }}
                                                onClick={toggleUpdate}
                                            >
                                                Cập nhật
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    marginLeft: '8px',
                                                    color: '#f5801f',
                                                    cursor: 'pointer',
                                                    fontWeight: '600'
                                                }}
                                                onClick={toggleUpdate}
                                            >
                                                Đóng
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`modal-admin__content__update-status ${selectUpdate}`}>
                            <label htmlFor="status">Trạng thái đơn hàng</label>
                            <select
                                name="status"
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                {statusOptions.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <div className="modal-admin__content__update-status__btn">
                                <Button size="full" onClick={handelUpdateStatus}>
                                    Lưu lại
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="loading">
                        <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                    </div>
                )}
                <div className="modal-admin__content__btn">
                    <Button size="sm" onClick={toggleViewModal}>
                        Đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ViewOrderModal

import ReactLoading from 'react-loading'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import Button from './Button'
import Badge from '../components/admin/Badge'
import { canceledOrderThunk } from '../redux/orderSlice'

const OrderViewModal = ({ viewModal, toggleViewModal, order }) => {
    const dispatch = useDispatch()
    const [orderInfo, setOrderInfo] = useState()
    useEffect(() => {
        setOrderInfo(order)
    }, [order])
    const handelCanceled = (id) => {
        dispatch(canceledOrderThunk(id))
        toast.success('Huỷ đơn hàng thành công !')
        toggleViewModal()
    }
    return (
        <div className={`order-modal ${viewModal}`}>
            <div className="order-modal__content">
                <div className="order-modal__content__title">
                    <h3>Chi tiết đơn hàng</h3>
                </div>
                {orderInfo ? (
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
                                        {orderInfo.cartItems.map((item, index) => (
                                            <div className="cart__item" key={index}>
                                                <div className="cart__item__image checkout__right__info__img">
                                                    <img src={item.product.images[0]} alt="" />
                                                </div>
                                                <div className="cart__item__info">
                                                    <div className="cart__item__info__name">
                                                        <Link
                                                            to={`/products/${item.id}`}
                                                        >{`${item.product.name} - ${item.color} - ${item.size}`}</Link>
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
                                            <Badge status={orderInfo.status} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {orderInfo.status === 'pendding' && (
                            <div
                                className="order-modal__content__body__btn"
                                onClick={() => handelCanceled(orderInfo.id)}
                            >
                                <Button size="full">Huỷ đơn hàng</Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="loading">
                        <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                    </div>
                )}
                <div className="order-modal__content__btn">
                    <Button size="sm" onClick={toggleViewModal}>
                        Đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OrderViewModal

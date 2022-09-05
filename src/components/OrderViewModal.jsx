import Button from './Button'

const OrderViewModal = ({ viewModal, toggleViewModal }) => {
    return (
        <div className={`order-modal ${viewModal}`}>
            <div className="order-modal__content">
                <div className="order-modal__content__title">
                    <h3>Chi tiết đơn hàng</h3>
                </div>
                <div className="order-modal__content__body">ok</div>
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

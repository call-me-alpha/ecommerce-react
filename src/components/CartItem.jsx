import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { removeItem, updateQuantityDown, updateQuantityUp } from '../redux/cartSlice'

const CartItem = (props) => {
    const dispatch = useDispatch()

    const [item, setItem] = useState(props.item)
    const [quantity, setQuantity] = useState(props.item.quantity)
    const [image, setImage] = useState('')

    useEffect(() => {
        setItem(props.item)
        setQuantity(props.item.quantity)
        if (props.item.product.images) {
            setImage(props.item.product.images[0])
        }
    }, [props.item])

    const updateQuantity = (type, item) => {
        if (type === '+') {
            setQuantity((prev) => prev + 1)
            dispatch(updateQuantityUp(item))
        } else {
            setQuantity((prev) => prev - 1)
            dispatch(updateQuantityDown(item))
        }
    }

    return (
        <>
            {props.item?.product ? (
                <div className="cart__item">
                    <div className="cart__item__image">
                        <img src={image} alt="" />
                    </div>
                    <div className="cart__item__info">
                        <div className="cart__item__info__name">
                            <Link to={`/products/${item.id}`}>
                                {`${item.product.name} - ${item.color} - ${item.size}`}
                            </Link>
                        </div>
                        <div className="cart__item__info__price">{item.product.price.toLocaleString()} VNĐ</div>
                        <div className="cart__item__info__quantity">
                            <div className="product-view__info__item__quantity">
                                <div
                                    className="product-view__info__item__quantity__btn"
                                    onClick={() => updateQuantity('-', item)}
                                >
                                    <i className="bx bx-minus"></i>
                                </div>
                                <div className="product-view__info__item__quantity__input">{quantity}</div>
                                <div
                                    className="product-view__info__item__quantity__btn"
                                    onClick={() => updateQuantity('+', item)}
                                >
                                    <i className="bx bx-plus"></i>
                                </div>
                            </div>
                        </div>
                        <div
                            className="cart__item__info__action"
                            onClick={() => {
                                dispatch(removeItem(item))
                                toast.success('Xoá sản phẩm thành công !')
                            }}
                        >
                            <i className="bx bx-trash"></i>
                        </div>
                    </div>
                </div>
            ) : (
                <>Chưa có sản phẩm nào</>
            )}
        </>
    )
}

CartItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default CartItem

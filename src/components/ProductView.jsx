import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import Button from '../components/Button'
import { addItem } from '../redux/cartSlice'
import { remove } from '../redux/productModalSlice'

const ProductView = (props) => {
    const dispatch = useDispatch()
    const [product, setProduct] = useState(props.product || {})
    const [showMoreDesc, setShowMoreDesc] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [size, setSize] = useState(undefined)
    const [color, setColor] = useState(undefined)
    const [sizeMess, setSizeMess] = useState(false)
    const [colorMess, setColorMess] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()
    useEffect(() => {
        if (props.product) {
            setProduct(props.product)
            if (props.product.images) {
                setPreviewImage(props.product.images[0])
            }
        }
    }, [props.product])
    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    const check = () => {
        if (color === undefined) {
            setColorMess(!colorMess)
            return false
        }
        if (size === undefined) {
            setSizeMess(!sizeMess)
            return false
        }
        return true
    }
    const handelAddToCart = () => {
        if (check()) {
            dispatch(
                addItem({
                    id: product.id,
                    color,
                    size,
                    price: product.price,
                    quantity,
                    product
                })
            )
            toast.success('Thêm vào giỏ hàng thành công!')
            setColor(undefined)
            setSize(undefined)
            setQuantity(1)
        }
    }

    const goToCart = () => {
        dispatch(remove())
        navigate('/cart')
    }
    return (
        <div className="product-view">
            <div className="product-view__images">
                <div className="product-view__images__list">
                    {product.images &&
                        product.images.map((image) => (
                            <div
                                className="product-view__images__list__item"
                                key={image}
                                onClick={() => setPreviewImage(image)}
                            >
                                <img src={image} alt="" />
                            </div>
                        ))}
                </div>
                <div className="product-view__images__main">{previewImage && <img src={previewImage} alt="" />}</div>
                <div className={`product-view__desc ${showMoreDesc ? 'show' : ''}`}>
                    {product.desc &&
                        product.desc.map((item, index) => (
                            <div className="product-view__desc__item" key={index}>
                                <div className="product-view__desc__item__title">{item.title}</div>
                                <div
                                    className="product-view__desc__item__content"
                                    dangerouslySetInnerHTML={{ __html: item.body }}
                                ></div>
                            </div>
                        ))}
                    <div className="product-view__desc__toggle">
                        <Button size="sm" onClick={() => setShowMoreDesc(!showMoreDesc)}>
                            {showMoreDesc ? 'Thu gọn' : 'Xem thêm'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product-view__info">
                <h1 className="product-view__info__title">{product.name && product.name}</h1>
                <div className="product-view__info__item">
                    <span className="product-view__info__item__price">
                        {product.price && product.price.toLocaleString()} VNĐ
                    </span>
                </div>
                <div className="product-view__info__item">
                    <div className="product-view__info__item__title">Màu sắc</div>
                    <div className="product-view__info__item__list">
                        {product.colors &&
                            product.colors.map((item, index) => (
                                <div
                                    className={`product-view__info__item__list__item ${color === item ? 'active' : ''}`}
                                    onClick={() => {
                                        setColor(item)
                                        setColorMess(false)
                                    }}
                                    key={index}
                                >
                                    <div className={`cricle bg-${item}`}></div>
                                </div>
                            ))}
                    </div>
                    <div className={`product-view__info__item__mess ${colorMess ? 'active' : ''}`}>
                        Vui lòng chọn màu sắc !
                    </div>
                </div>
                <div className="product-view__info__item">
                    <div className="product-view__info__item__title">Kích cỡ</div>
                    <div className="product-view__info__item__list">
                        {product.sizes &&
                            product.sizes.map((item, index) => (
                                <div
                                    className={`product-view__info__item__list__item ${size === item ? 'active' : ''}`}
                                    onClick={() => {
                                        setSize(item)
                                        setSizeMess(false)
                                    }}
                                    key={index}
                                >
                                    <div className="product-view__info__item__list__item__size ">{item}</div>
                                </div>
                            ))}
                    </div>
                    <div className={`product-view__info__item__mess ${sizeMess ? 'active' : ''}`}>
                        Vui lòng chọn kích cỡ !
                    </div>
                </div>
                <div className="product-view__info__item">
                    <div className="product-view__info__item__title">Số lượng</div>
                    <div className="product-view__info__item__quantity">
                        <div
                            className="product-view__info__item__quantity__btn"
                            onClick={() => updateQuantity('minus')}
                        >
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product-view__info__item__quantity__input">{quantity}</div>
                        <div className="product-view__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="product-view__info__item">
                    <Button size="full" onClick={handelAddToCart}>
                        Thêm vào giỏ hàng
                    </Button>
                    <Button size="full" onClick={goToCart}>
                        Đi tới giỏ hàng
                    </Button>
                </div>
            </div>
            <div className={`product-view__desc mobile ${showMoreDesc ? 'show' : ''}`}>
                {product.desc &&
                    product.desc.map((item, index) => (
                        <div className="product-view__desc__item" key={index}>
                            <div className="product-view__desc__item__title">{item.title}</div>
                            <div
                                className="product-view__desc__item__content"
                                dangerouslySetInnerHTML={{ __html: item.body }}
                            ></div>
                        </div>
                    ))}
                <div className="product-view__desc__toggle">
                    <Button size="sm" onClick={() => setShowMoreDesc(!showMoreDesc)}>
                        {showMoreDesc ? 'Thu gọn' : 'Xem thêm'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductView

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductView from '../components/ProductView'
import Button from './Button'
import productApi from '../api/productApi'
import { remove } from '../redux/productModalSlice'

const ProductViewModal = () => {
    const dispatch = useDispatch()
    const id = useSelector((state) => state.productModal.value)
    const [product, setProduct] = useState(undefined)
    console.log(id)
    useEffect(() => {
        const getProductServer = async () => {
            const res = await productApi.getOne(id)
            setProduct(res)
        }
        if (id) {
            getProductServer()
        }
    }, [id])
    console.log(product)
    return (
        <div className={`product-modal ${id === null ? '' : 'active'}`}>
            <div className="product-modal__content">
                <ProductView product={product} />
                <div className="product-modal__content__close">
                    <Button size="sm" onClick={() => dispatch(remove())}>
                        Đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductViewModal

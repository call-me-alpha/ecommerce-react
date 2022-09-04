import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'

import ProductItem from './ProductItem'
import Grid from './Grid'

const Pagination = ({ data, count, col }) => {
    const pageItem = col ? col : 6
    const [products, setProducts] = useState(data)
    const [loading, setLoading] = useState(false)
    const [hide, setHide] = useState(true)

    useEffect(() => {
        setProducts(data.slice(0, pageItem))
        setHide(true)
    }, [data, pageItem])

    const handelLoad = () => {
        setLoading(true)
        setProducts(data)
        toast.loading('Đang load thêm sản phẩm...')
        setTimeout(() => {
            setLoading(false)
            toast.dismiss()
        }, 1000)
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        setHide(false)
    }

    return (
        <div className="pagination">
            {loading ? (
                <div className="pagination__loading"></div>
            ) : (
                <div style={{ width: '100%' }}>
                    <Grid col={col ? col : 3} mdCol={2} smCol={1} gap={10}>
                        {products.length ? (
                            products.map((prod) => <ProductItem key={prod.id} product={prod} />)
                        ) : (
                            <div className="loading">
                                <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                            </div>
                        )}
                    </Grid>
                    {count > pageItem && hide && (
                        <div className="pagination__btn">
                            <button onClick={handelLoad}>Xem tất cả {count} sản phẩm</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

Pagination.propTypes = {
    data: PropTypes.array.isRequired
}

export default Pagination

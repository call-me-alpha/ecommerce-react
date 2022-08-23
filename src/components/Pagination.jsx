import PropTypes from 'prop-types'

import ProductItem from './ProductItem'
import Grid from './Grid'
import { useEffect, useMemo, useState } from 'react'

const Pagination = ({ data, count }) => {
    const temp = useMemo(() => {
        return [...data]
    }, [data])
    const pageItem = 6
    const [products, setProducts] = useState(temp)
    const [loading, setLoading] = useState(false)
    const [hide, setHide] = useState(true)

    useEffect(() => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        setProducts(temp.splice(0, pageItem))
        setHide(true)
    }, [temp])

    const handelLoad = () => {
        setLoading(true)
        setProducts(data)
        setTimeout(() => {
            setLoading(false)
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
                <div>
                    <Grid col={3} mdCol={2} smCol={1} gap={10}>
                        {products && products.map((prod) => <ProductItem key={prod.id} product={prod} />)}
                    </Grid>
                    {count > pageItem && hide && (
                        <div className="pagination__btn">
                            <button onClick={handelLoad}>Xem tất cả</button>
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

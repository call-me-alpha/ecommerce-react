import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { getProducts } from '../redux/apiProduct'
import { productsRematingSelector } from '../redux/selectors'

import Grid from './Grid'
import Product from './Product'

const Products = () => {
    const dispacth = useDispatch()
    useEffect(() => {
        dispacth(getProducts())
    }, [dispacth])
    const products = useSelector(productsRematingSelector)

    return (
        <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {products.map((prod) => (
                <Product product={prod} key={prod.id} />
            ))}
        </Grid>
    )
}

export default Products

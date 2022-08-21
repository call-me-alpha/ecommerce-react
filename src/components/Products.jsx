import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { getProducts } from '../redux/apiProduct'
import { productsRematingSelector } from '../redux/selectors'

import Grid from './Grid'
import Product from './Product'
import { unwrapResult } from '@reduxjs/toolkit'

const Products = (props) => {
    const dispacth = useDispatch()
    useEffect(() => {
        dispacth(getProducts())
    }, [])
    let products = useSelector(productsRematingSelector)
    const { tag } = props
    if (tag) {
        products = products.filter((prod) => prod.tag === tag).splice(0, 8)
    }
    return (
        <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {products.map((prod) => (
                <Product product={prod} key={prod.id} />
            ))}
        </Grid>
    )
}

export default Products

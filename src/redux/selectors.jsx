import { createSelector } from '@reduxjs/toolkit'

const productsSelector = (state) => state.products.products
const tagsFilterSelector = (state) => state.filters.tags

const productsRematingSelector = createSelector(productsSelector, tagsFilterSelector, (products, tags) => {
    if (tags) return products.filter((prod) => prod.tags.includes(tags))
    return products
})

export { productsRematingSelector }

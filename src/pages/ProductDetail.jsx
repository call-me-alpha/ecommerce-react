import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import productsApi from '../api/productApi'
import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import Pagination from '../components/Pagination'
import ProductView from '../components/ProductView'

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const { id } = useParams()
    useEffect(() => {
        window.scrollTo(0, 0)
        const getProductServer = async () => {
            const res = await productsApi.getOne(id)
            setProduct(res)
        }
        const getProductsServer = async () => {
            try {
                const res = await productsApi.getAll()
                setProducts(res)
            } catch (err) {
                console.log(err)
            }
        }
        getProductServer()
        getProductsServer()
    }, [id])

    const productSimilar = useMemo(() => {
        let temp
        temp = products.filter((prod) => prod.category === product.category)
        temp = temp.filter((prod) => prod.id !== product.id)
        return temp
    }, [products, product])
    return (
        <Helmet title="Chi tiết sản phẩm">
            <Section>
                <SectionBody>
                    <ProductView product={product} />
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Sản phẩm cùng loại</SectionTitle>
                <SectionBody>
                    {productSimilar && (
                        <Pagination data={productSimilar} count={productSimilar.length} col={4}></Pagination>
                    )}
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Khám phá thêm</SectionTitle>
                <SectionBody>
                    {products && <Pagination data={products} count={products.length} col={4}></Pagination>}
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default ProductDetail

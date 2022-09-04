import { useEffect, useMemo, useState } from 'react'
import ReactLoading from 'react-loading'

import productApi from '../api/productApi'
import ProductItem from '../components/ProductItem'
import Helmet from '../components/Helmet'
import Slider from '../components/Slider'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyItem from '../components/PolicyItem'
import Banner from '../components/Banner'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import SliderShow from '../components/SliderShow'
import Grid from '../components/Grid'

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        window.scrollTo(0, 0)
        const getProductsServer = async () => {
            const res = await productApi.getAll()
            setProducts(res)
        }
        getProductsServer()
    }, [])

    const { productsNew, productsPopular, productsSeller } = useMemo(() => {
        const productsNew = products.filter((prod) => prod.tag === 'new').splice(0, 8)
        const productsPopular = products.filter((prod) => prod.tag === 'popular').splice(0, 8)
        const productsSeller = products.filter((prod) => prod.tag === 'seller').splice(0, 8)
        return { productsNew, productsPopular, productsSeller }
    }, [products])
    return (
        <Helmet title="Thời trang hàng hiệu, cá tính và phòng cách hàng đầu Việt Nam!">
            <Slider />
            <Section>
                <SectionBody>
                    <PolicyItem />
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Sản bán chạy nhất</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productsSeller.length ? (
                            productsSeller.map((prod) => (
                                <ProductItem product={prod} key={prod.id} path={`/products/${prod.id}`} />
                            ))
                        ) : (
                            <div className="loading">
                                <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                            </div>
                        )}
                    </Grid>
                    <Link to="/products" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button size="md">Xem thêm</Button>
                    </Link>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Sản phẩm nổi bật</SectionTitle>
                <SectionBody>
                    <SliderShow products={productsPopular} />
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Sản phẩm mới</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productsNew ? (
                            productsNew.map((prod) => <ProductItem product={prod} key={prod.id} />)
                        ) : (
                            <div className="loading">
                                <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                            </div>
                        )}
                    </Grid>
                    <Link to="/products" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button size="md">Xem thêm</Button>
                    </Link>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Hình ảnh cửa hàng</SectionTitle>
                <SectionBody>
                    <Banner />
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Home

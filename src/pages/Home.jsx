import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
import { getProdutcsServer } from '../redux/productSlice'

const Home = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.products)
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getProdutcsServer())
    }, [dispatch])

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
                        {productsSeller &&
                            productsSeller.map((prod) => (
                                <ProductItem product={prod} key={prod.id} path={`/products/${prod.id}`} />
                            ))}
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
                        {productsNew && productsNew.map((prod) => <ProductItem product={prod} key={prod.id} />)}
                    </Grid>
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

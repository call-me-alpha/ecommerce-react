import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Helmet from '../components/Helmet'
import Slider from '../components/Slider'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Banner from '../components/Banner'
import { getAllProductServer } from '../redux/apiProduct'
import { productsSelector } from '../redux/selectors'

const Home = () => {
    const products = useSelector(productsSelector)
    console.log(products)
    const dispacth = useDispatch()
    useEffect(() => {
        dispacth(getAllProductServer())
    }, [])
    return (
        <>
            <Header />
            <div className="container">
                <div className="main">
                    <Helmet title="Thời trang hàng hiệu, cá tính và phòng cách hàng đầu Việt Nam!">
                        <Slider />
                        <Section>
                            <SectionBody>
                                <PolicyCard />
                            </SectionBody>
                        </Section>
                        <Section>
                            <SectionTitle>Sản phẩm mới</SectionTitle>
                            <SectionBody></SectionBody>
                        </Section>
                        <Section>
                            <SectionTitle>Hình ảnh cửa hàng</SectionTitle>
                            <SectionBody>
                                <Banner />
                            </SectionBody>
                        </Section>
                    </Helmet>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home

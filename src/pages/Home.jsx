import Helmet from '../components/Helmet'
import Slider from '../components/Slider'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Banner from '../components/Banner'
import Products from '../components/Products'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { filtersTags } from '../redux/filtersSlice'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

const Home = () => {
    const dispacth = useDispatch()
    useEffect(() => {
        dispacth(filtersTags('new'))
    }, [dispacth])
    return (
        <Helmet title="Thời trang hàng hiệu, cá tính và phòng cách hàng đầu Việt Nam!">
            <Slider />
            <Section>
                <SectionBody>
                    <PolicyCard />
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Sản phẩm mới</SectionTitle>
                <SectionBody>
                    <Products />
                    <Link to="/products" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button>Xem thêm</Button>
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

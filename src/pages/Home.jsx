import Helmet from '../components/Helmet'
import Slider from '../components/Slider'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Banner from '../components/Banner'
import Products from '../components/Products'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import SliderShow from '../components/SliderShow'

const Home = () => {
    return (
        <Helmet title="Thời trang hàng hiệu, cá tính và phòng cách hàng đầu Việt Nam!">
            <Slider />
            <Section>
                <SectionBody>
                    <PolicyCard />
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Sản bán chạy nhất</SectionTitle>
                <SectionBody>
                    <Products tag="seller" />
                    <Link to="/products" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button size="md">Xem thêm</Button>
                    </Link>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Sản phẩm nổi bật</SectionTitle>
                <SectionBody>
                    <SliderShow tag="popular" />
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Sản phẩm mới</SectionTitle>
                <SectionBody>
                    <Products tag="new" />
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

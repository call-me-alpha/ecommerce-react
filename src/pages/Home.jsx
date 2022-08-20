import Helmet from '../components/Helmet'
import Slider from '../components/Slider'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Banner from '../components/Banner'

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
                <SectionTitle>Hình ảnh cửa hàng</SectionTitle>
                <SectionBody>
                    <Banner />
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Home

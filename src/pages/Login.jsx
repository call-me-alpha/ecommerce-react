import { Link } from 'react-router-dom'

import background from '../assets/images/background.jpeg'
import logo from '../assets/images/logos/logo.png'
import Helmet from '../components/Helmet'
import PolicyItem from '../components/PolicyItem'
import Section, { SectionBody } from '../components/Section'
import Button from '../components/Button'

const Login = () => {
    return (
        <Helmet title="Đăng nhập">
            <div className="login" style={{ background: `url(${background}) center` }}>
                <div className="login__overlay"></div>
                <div className="login__content">
                    <div className="login__content__info">
                        <div className="login__content__info__logo">
                            <img src={logo} alt="" />
                        </div>
                        <div className="login__content__info__text">
                            <h4>Chào mừng bạn đến FIONA</h4>
                            <p>
                                Chào mừng bạn đến FIONA Dịch vụ của FIONA không chỉ đơn giản là thái độ phục vụ của nhân
                                viên tư vấn bán hàng mà thể hiện thông qua các sản phẩm FIONA – đây không chỉ là quần áo
                                mà còn là toàn bộ tình yêu, nhiệt huyết của toàn thể các thành viên FIONA từ các nhà
                                thiết kế đẳng cấp, chuyên gia cắt, may mẫu, tới các chị gấp sản phẩm hoàn thiện nó.
                            </p>
                        </div>
                    </div>
                    <div className="login__content__form">
                        <div className="login__content__form__title">đăng nhập</div>
                        <div className="login__content__form__not-account">
                            Nếu bạn chưa có tài khoản,
                            <span>
                                <Link to="/register">đăng ký tại đây</Link>
                            </span>
                        </div>
                        <div className="login__content__form__group">
                            <label htmlFor="email">Email của bạn</label>
                            <input type="text" placeholder="Email" id="email" />
                        </div>
                        <div className="login__content__form__group">
                            <label htmlFor="pass">Mật khẩu</label>
                            <input type="password" placeholder="Password" id="pass" />
                        </div>
                        <div className="login__content__form__btn">
                            <Button size="full">Đăng nhập</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Section>
                <SectionBody>
                    <PolicyItem />
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Login

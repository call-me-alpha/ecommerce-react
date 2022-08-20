import Grid from './Grid'
import logo from '../assets/images/logo-footer.png'
import { Link } from 'react-router-dom'

const footerAboutLinks = [
    {
        display: 'Giới thiệu',
        path: '/about'
    },
    {
        display: 'Tin tức',
        path: '/about'
    },
    {
        display: 'Hệ thống cửa hàng',
        path: '/about'
    },
    {
        display: 'Tuyển dụng',
        path: '/about'
    },
    {
        display: 'Liên hệ',
        path: '/about'
    }
]
const footerCustomerLinks = [
    {
        display: 'Hướng dẫn mua hàng',
        path: '/about'
    },
    {
        display: 'Hình thức thanh toán',
        path: '/about'
    },
    {
        display: 'Chính sách bảo hành',
        path: '/about'
    },
    {
        display: 'Chính sách vận chuyển',
        path: '/about'
    },
    {
        display: 'Chính sách bảo mật thông tin',
        path: '/about'
    }
]

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__item">
                    <Grid col={3} mdCol={1} smCol={1} gap={20}>
                        <div>
                            <div className="footer__item__title">
                                <p>Đăng ký nhận thông tin</p>
                            </div>
                            <div className="footer__item__content">
                                <p>
                                    Đăng ký ngay để là người đầu tiên cập nhật sớm nhất những tin tức thời trang, những
                                    bộ sưu tập cũng như ưu đãi hấp dẫn từ FIONA.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="footer__item__content">
                                <input type="text" placeholder="Nhập email đăng ký của bạn..." />
                                <button>Đăng ký</button>
                            </div>
                        </div>
                        <div>
                            <div className="footer__item__title">
                                <p>Kết nối với chúng tôi</p>
                            </div>
                            <div className="footer__item__content">
                                <a href="https://github.com/call-me-alpha">
                                    <i className="bx bxl-github"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/call-me-alpha/">
                                    <i className="bx bxl-linkedin-square"></i>
                                </a>
                                <a href="https://www.facebook.com/nguyentuhuy97">
                                    <i className="bx bxl-facebook-circle"></i>
                                </a>
                                <a href="https://www.instagram.com/97.nguyentuhuy/">
                                    <i className="bx bxl-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </Grid>
                </div>
                <div className="footer__item">
                    <Grid col={4} mdCol={2} smCol={1} gap={30}>
                        <div>
                            <div className="footer__item__title">
                                <Link to="/" className="footer__item__title__link">
                                    <img src={logo} alt="" />
                                </Link>
                            </div>
                            <div className="footer__item__content">
                                <p>
                                    Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ hành động của
                                    mình” là sứ mệnh, là triết lý, chiến lược.. luôn cùng FIONA tiến bước.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="footer__item__title">
                                <p>Về chúng tôi</p>
                            </div>
                            <div className="footer__item__content">
                                {footerAboutLinks.map((item, index) => (
                                    <p key={index}>{item.display}</p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="footer__item__title">
                                <p>Hỗ trợ khách hàng</p>
                            </div>
                            <div className="footer__item__content">
                                {footerCustomerLinks.map((item, index) => (
                                    <p key={index}>{item.display}</p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="footer__item__title">
                                <p>Thông tin liên hệ</p>
                            </div>
                            <div className="footer__item__content">
                                <p>Địa chỉ: Hoà Minh, Liên Chiểu, Đà Nẵng</p>
                                <p>Mã số Doanh Nghiệp: 012345012345</p>
                                <p>Email: example@gmail.com</p>
                            </div>
                        </div>
                    </Grid>
                </div>
                <div className="footer__item">
                    <p>Copyright &copy; call-me-alpha</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

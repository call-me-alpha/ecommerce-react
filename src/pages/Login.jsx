import {
    signInWithPopup,
    FacebookAuthProvider,
    getAdditionalUserInfo,
    GoogleAuthProvider,
    GithubAuthProvider
} from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import background from '../assets/images/background.jpeg'
import logo from '../assets/images/logos/logo.png'
import Helmet from '../components/Helmet'
import PolicyItem from '../components/PolicyItem'
import Section, { SectionBody } from '../components/Section'
import { auth } from '../firebase/config'
import userApi from '../api/userApi'
import { login } from '../redux/userSlice'

const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const providerFb = new FacebookAuthProvider()
    const providerGg = new GoogleAuthProvider()
    const providerGh = new GithubAuthProvider()
    const handelLoginFb = async () => {
        const data = await signInWithPopup(auth, providerFb)
        const { isNewUser } = getAdditionalUserInfo(data)
        const {
            user: { uid, displayName, email, photoURL }
        } = data
        if (isNewUser) {
            const fomrData = {
                id: uid,
                name: displayName,
                email,
                avatar: photoURL,
                role: 'user'
            }
            const registerServer = async (data) => {
                try {
                    const res = await userApi.register(data)
                    dispatch(login(res))
                } catch (err) {
                    toast.error(err)
                }
            }
            registerServer(fomrData)
        } else {
            const getUserServer = async (id) => {
                try {
                    const res = await userApi.getOne(id)
                    dispatch(login(res))
                } catch (err) {
                    console.log(err)
                    toast.error(err)
                }
            }
            getUserServer(uid)
        }
        navigate('/')
        toast.success('????ng nh???p th??nh c??ng!')
    }
    const handelLoginGg = async () => {
        const data = await signInWithPopup(auth, providerGg)
        const { isNewUser } = getAdditionalUserInfo(data)
        const {
            user: { uid, displayName, email, photoURL }
        } = data
        if (isNewUser) {
            const fomrData = {
                id: uid,
                name: displayName,
                email,
                avatar: photoURL,
                role: 'user'
            }
            const registerServer = async (data) => {
                try {
                    const res = await userApi.register(data)
                    dispatch(login(res))
                } catch (err) {
                    toast.error(err)
                }
            }
            registerServer(fomrData)
        } else {
            const getUserServer = async (id) => {
                try {
                    const res = await userApi.getOne(id)
                    dispatch(login(res))
                } catch (err) {
                    toast.error(err)
                }
            }
            getUserServer(uid)
        }
        navigate('/')
        toast.success('????ng nh???p th??nh c??ng!')
    }
    const handelLoginGh = async () => {
        const data = await signInWithPopup(auth, providerGh)
        const { isNewUser } = getAdditionalUserInfo(data)
        const {
            user: { uid, displayName, email, photoURL }
        } = data
        if (isNewUser) {
            const fomrData = {
                id: uid,
                name: displayName,
                email,
                avatar: photoURL,
                role: 'user'
            }
            const registerServer = async (data) => {
                try {
                    const res = await userApi.register(data)
                    dispatch(login(res))
                } catch (err) {
                    toast.error(err)
                }
            }
            registerServer(fomrData)
        } else {
            const getUserServer = async (id) => {
                try {
                    const res = await userApi.getOne(id)
                    dispatch(login(res))
                } catch (err) {
                    console.log(err)
                    toast.error(err)
                }
            }
            getUserServer(uid)
        }
        navigate('/')
        toast.success('????ng nh???p th??nh c??ng!')
    }
    return (
        <Helmet title="????ng nh???p">
            <div className="login" style={{ background: `url(${background}) center` }}>
                <div className="login__overlay"></div>
                <div className="login__content">
                    <div className="login__content__info">
                        <div className="login__content__info__logo">
                            <img src={logo} alt="" />
                        </div>
                        <div className="login__content__info__text">
                            <h4>Ch??o m???ng b???n ?????n FIONA</h4>
                            <p>
                                Ch??o m???ng b???n ?????n FIONA D???ch v??? c???a FIONA kh??ng ch??? ????n gi???n l?? th??i ????? ph???c v??? c???a nh??n
                                vi??n t?? v???n b??n h??ng m?? th??? hi???n th??ng qua c??c s???n ph???m FIONA ??? ????y kh??ng ch??? l?? qu???n ??o
                                m?? c??n l?? to??n b??? t??nh y??u, nhi???t huy???t c???a to??n th??? c??c th??nh vi??n FIONA t??? c??c nh??
                                thi???t k??? ?????ng c???p, chuy??n gia c???t, may m???u, t???i c??c ch??? g???p s???n ph???m ho??n thi???n n??.
                            </p>
                        </div>
                    </div>
                    <div className="login__content__form">
                        <div className="login__content__form__title">????ng nh???p</div>
                        <div className="login__content__form__text">????ng nh???p b???ng</div>
                        <div className="login__content__form__item facebook" onClick={handelLoginFb}>
                            <div className="login__content__form__item__logo">
                                <i className="bx bxl-facebook-square"></i>
                            </div>
                            <div className="login__content__form__item__name">Facebook</div>
                        </div>
                        <div className="login__content__form__item google" onClick={handelLoginGg}>
                            <div className="login__content__form__item__logo">
                                <i className="bx bxl-google"></i>
                            </div>
                            <div className="login__content__form__item__name">Google</div>
                        </div>
                        <div className="login__content__form__item github" onClick={handelLoginGh}>
                            <div className="login__content__form__item__logo">
                                <i className="bx bxl-github"></i>
                            </div>
                            <div className="login__content__form__item__name">Github</div>
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

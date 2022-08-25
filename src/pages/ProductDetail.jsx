import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { withRouter } from '../hooks/withRoter'
import productsApi from '../api/productApi'
import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import Pagination from '../components/Pagination'
import PolicyItem from '../components/PolicyItem'
import Button from '../components/Button'

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const [showMoreDesc, setShowMoreDesc] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [size, setSize] = useState(undefined)
    const [color, setColor] = useState(undefined)
    const [sizeMess, setSizeMess] = useState(false)
    const [colorMess, setColorMess] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        window.scrollTo(0, 0)
        const getProductServer = async () => {
            const res = await productsApi.getOne(id)
            setProduct(res)
            setPreviewImage(res.images[0])
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
    console.log(size, color)

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    const check = () => {
        if (color === undefined) {
            setColorMess(!colorMess)
            return false
        }
        if (size === undefined) {
            setSizeMess(!sizeMess)
            return false
        }
        return true
    }
    const handelAddToCart = () => {
        if (check()) {
            console.log(color, size, quantity)
        }
    }

    const goToCart = () => {
        if (check()) navigate('/cart')
    }

    return (
        <Helmet title="Chi tiết sản phẩm">
            <Section>
                <SectionBody>
                    <div className="product-view">
                        <div className="product-view__images">
                            <div className="product-view__images__list">
                                {product.images &&
                                    product.images.map((image) => (
                                        <div
                                            className="product-view__images__list__item"
                                            key={image}
                                            onClick={() => setPreviewImage(image)}
                                        >
                                            <img src={image} alt="" />
                                        </div>
                                    ))}
                            </div>
                            <div className="product-view__images__main">
                                {previewImage && <img src={previewImage} alt="" />}
                            </div>
                            <div className={`product-view__desc ${showMoreDesc ? 'show' : ''}`}>
                                {product.desc &&
                                    product.desc.map((item, index) => (
                                        <div className="product-view__desc__item" key={index}>
                                            <div className="product-view__desc__item__title">{item.title}</div>
                                            <div
                                                className="product-view__desc__item__content"
                                                dangerouslySetInnerHTML={{ __html: item.body }}
                                            ></div>
                                        </div>
                                    ))}
                                <div className="product-view__desc__toggle">
                                    <Button size="sm" onClick={() => setShowMoreDesc(!showMoreDesc)}>
                                        {showMoreDesc ? 'Thu gọn' : 'Xem thêm'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="product-view__info">
                            <h1 className="product-view__info__title">{product.name && product.name}</h1>
                            <div className="product-view__info__item">
                                <span className="product-view__info__item__price">
                                    {product.price && product.price.toLocaleString()} VNĐ
                                </span>
                            </div>
                            <div className="product-view__info__item">
                                <div className="product-view__info__item__title">Màu sắc</div>
                                <div className="product-view__info__item__list">
                                    {product.colors &&
                                        product.colors.map((item, index) => (
                                            <div
                                                className={`product-view__info__item__list__item ${
                                                    color === item ? 'active' : ''
                                                }`}
                                                onClick={() => {
                                                    setColor(item)
                                                    setColorMess(false)
                                                }}
                                                key={index}
                                            >
                                                <div className={`cricle bg-${item}`}></div>
                                            </div>
                                        ))}
                                </div>
                                <div className={`product-view__info__item__mess ${colorMess ? 'active' : ''}`}>
                                    Vui lòng chọn màu sắc !
                                </div>
                            </div>
                            <div className="product-view__info__item">
                                <div className="product-view__info__item__title">Kích cỡ</div>
                                <div className="product-view__info__item__list">
                                    {product.sizes &&
                                        product.sizes.map((item, index) => (
                                            <div
                                                className={`product-view__info__item__list__item ${
                                                    size === item ? 'active' : ''
                                                }`}
                                                onClick={() => {
                                                    setSize(item)
                                                    setSizeMess(false)
                                                }}
                                                key={index}
                                            >
                                                <div className="product-view__info__item__list__item__size ">
                                                    {item}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <div className={`product-view__info__item__mess ${sizeMess ? 'active' : ''}`}>
                                    Vui lòng chọn kích cỡ !
                                </div>
                            </div>
                            <div className="product-view__info__item">
                                <div className="product-view__info__item__title">Số lượng</div>
                                <div className="product-view__info__item__quantity">
                                    <div
                                        className="product-view__info__item__quantity__btn"
                                        onClick={() => updateQuantity('minus')}
                                    >
                                        <i className="bx bx-minus"></i>
                                    </div>
                                    <div className="product-view__info__item__quantity__input">{quantity}</div>
                                    <div
                                        className="product-view__info__item__quantity__btn"
                                        onClick={() => updateQuantity('plus')}
                                    >
                                        <i className="bx bx-plus"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="product-view__info__item">
                                <Button onClick={handelAddToCart}>Thêm vào giỏ hàng</Button>
                                <Button onClick={goToCart}>Mua ngay</Button>
                            </div>
                        </div>
                        <div className={`product-view__desc mobile ${showMoreDesc ? 'show' : ''}`}>
                            {product.desc &&
                                product.desc.map((item, index) => (
                                    <div className="product-view__desc__item" key={index}>
                                        <div className="product-view__desc__item__title">{item.title}</div>
                                        <div
                                            className="product-view__desc__item__content"
                                            dangerouslySetInnerHTML={{ __html: item.body }}
                                        ></div>
                                    </div>
                                ))}
                            <div className="product-view__desc__toggle">
                                <Button size="sm" onClick={() => setShowMoreDesc(!showMoreDesc)}>
                                    {showMoreDesc ? 'Thu gọn' : 'Xem thêm'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </SectionBody>
            </Section>
            {productSimilar.length && (
                <Section>
                    <SectionTitle>Sản phẩm cùng loại</SectionTitle>
                    <SectionBody>
                        {productSimilar && (
                            <Pagination data={productSimilar} count={productSimilar.length} col={4}></Pagination>
                        )}
                    </SectionBody>
                </Section>
            )}
            <Section>
                <SectionTitle>Khám phá thêm</SectionTitle>
                <SectionBody>
                    {products && <Pagination data={products} count={products.length} col={4}></Pagination>}
                </SectionBody>
            </Section>
            <Section>
                <SectionBody>
                    <PolicyItem />
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default withRouter(ProductDetail)

import { useEffect, useState, useMemo, useRef } from 'react'

import productApi from '../api/productApi'
import Helmet from '../components/Helmet'
import categoryApi from '../api/categoryApi'
import Button from '../components/Button'
import Pagination from '../components/Pagination'

const colors = [
    {
        display: 'Trắng',
        color: 'white'
    },
    {
        display: 'Đen',
        color: 'black'
    },
    {
        display: 'Hồng',
        color: 'pink'
    },
    {
        display: 'Cam',
        color: 'orange'
    },
    {
        display: 'Xanh dương',
        color: 'blue'
    }
]
const sizes = [
    {
        display: 'S',
        size: 'S'
    },
    {
        display: 'M',
        size: 'M'
    },
    {
        display: 'L',
        size: 'L'
    },
    {
        display: 'XL',
        size: 'XL'
    },
    {
        display: 'XXL',
        size: 'XXL'
    }
]
const Products = () => {
    const initFilters = {
        categories: [],
        colors: [],
        sizes: [],
        price: 0
    }
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [filters, setFilters] = useState(initFilters)
    const [searchText, setSearchText] = useState('')
    useEffect(() => {
        const getProductServer = async () => {
            try {
                const res = await productApi.getAll()
                setProducts(res)
            } catch (err) {
                console.log(err)
            }
        }
        getProductServer()
    }, [])

    useEffect(() => {
        const getCategoryServer = async () => {
            try {
                const data = await categoryApi.getAll()
                setCategories(data)
            } catch (err) {
                console.log(err)
            }
        }
        getCategoryServer()
    }, [])

    const filterSlectect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilters({ ...filters, categories: [...filters.categories, item.id] })
                    break
                case 'COLOR':
                    setFilters({ ...filters, colors: [...filters.colors, item.color] })
                    break
                case 'SIZE':
                    setFilters({ ...filters, sizes: [...filters.sizes, item.size] })
                    break
                default:
                    break
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filters.categories.filter((e) => e !== item.id)
                    setFilters({ ...filters, categories: newCategory })
                    break
                case 'COLOR':
                    const newColor = filters.colors.filter((e) => e !== item.color)
                    setFilters({ ...filters, colors: newColor })
                    break
                case 'SIZE':
                    const newSize = filters.sizes.filter((e) => e !== item.size)
                    setFilters({ ...filters, sizes: newSize })
                    break
                default:
                    break
            }
        }
    }

    const { productList, count } = useMemo(() => {
        let productList = products
        if (filters.categories.length > 0) {
            productList = productList.filter((prod) => filters.categories.includes(prod.category))
        }
        if (filters.colors.length > 0) {
            productList = productList.filter((prod) => prod.colors.find((color) => filters.colors.includes(color)))
        }
        if (filters.sizes.length > 0) {
            productList = productList.filter((prod) => prod.sizes.find((size) => filters.sizes.includes(size)))
        }
        productList = productList.filter((prod) => prod.name.includes(searchText))
        const count = productList.length
        return { productList, count }
    }, [filters, products, searchText])

    const clearFilters = () => {
        setFilters(initFilters)
        setSearchText('')
    }
    const filterFef = useRef()
    const toggleFilterShow = () => filterFef.current.classList.toggle('active')

    return (
        <Helmet title="Sản Phẩm">
            <div className="products">
                <div className="products__filter" ref={filterFef}>
                    <div className="products__filter__close" onClick={toggleFilterShow}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="products__filter__search">
                        <input
                            value={searchText}
                            type="text"
                            placeholder="Nhập từ khoá tìm kiếm..."
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <div className="products__filter__widget">
                        <div className="products__filter__widget__title">Danh mục sản phẩm</div>
                        <div className="products__filter__widget__content">
                            {categories.map((cate) => (
                                <div className="products__filter__widget__content__item" key={cate.id}>
                                    <label className="products__filter__widget__content__item__checkbox">
                                        <input
                                            type="checkbox"
                                            checked={filters.categories.includes(cate.id)}
                                            onChange={(e) => filterSlectect('CATEGORY', e.target.checked, cate)}
                                        />
                                        <span className="products__filter__widget__content__item__checkbox__checkmark">
                                            <i className="bx bx-check"></i>
                                        </span>
                                        {cate.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="products__filter__widget">
                        <div className="products__filter__widget__title">Màu Sắc</div>
                        <div className="products__filter__widget__content">
                            {colors.map((color) => (
                                <div className="products__filter__widget__content__item" key={color.color}>
                                    <label className="products__filter__widget__content__item__checkbox">
                                        <input
                                            type="checkbox"
                                            checked={filters.colors.includes(color.color)}
                                            onChange={(e) => filterSlectect('COLOR', e.target.checked, color)}
                                        />
                                        <span className="products__filter__widget__content__item__checkbox__checkmark">
                                            <i className="bx bx-check"></i>
                                        </span>
                                        {color.display}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="products__filter__widget">
                        <div className="products__filter__widget__title">Kích cỡ</div>
                        <div className="products__filter__widget__content">
                            {sizes.map((size) => (
                                <div className="products__filter__widget__content__item" key={size.size}>
                                    <label className="products__filter__widget__content__item__checkbox">
                                        <input
                                            type="checkbox"
                                            checked={filters.sizes.includes(size.size)}
                                            onChange={(e) => filterSlectect('SIZE', e.target.checked, size)}
                                        />
                                        <span className="products__filter__widget__content__item__checkbox__checkmark">
                                            <i className="bx bx-check"></i>
                                        </span>
                                        {size.display}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="products__filter__widget">
                        <div className="products__filter__widget__content">
                            <Button size="sm" onClick={clearFilters}>
                                Xoá bộ lọc
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="products__filter__toggle">
                    <Button size="sm" onClick={toggleFilterShow}>
                        Bộ lọc
                    </Button>
                </div>
                <div className="products__content">
                    <div className="products__content__title">
                        <p>( {count} ) sản phẩm phù hợp</p>
                    </div>
                    <Pagination data={productList} count={count} />
                </div>
            </div>
        </Helmet>
    )
}

export default Products

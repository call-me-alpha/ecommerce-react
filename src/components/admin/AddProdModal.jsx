import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import Button from '../Button'
import { getCategoriesThunk } from '../../redux/categorySlice'
import { createProdThunk } from '../../redux/productSlice'

const sizeList = ['S', 'M', 'L', 'XL', 'XXL']
const colorList = ['white', 'blue', 'orange', 'pink', 'black', 'red']
const descs = [
    {
        title: 'Thông tin chi tiết sản phẩm',
        body: ''
    },
    {
        title: 'Mô tả',
        body: 'FIONA là thương hiệu thời trang nữ công sở cao cấp được các chị em rất tin tưởng sử dụng.<br> - Đầm công sở thiết kế độc quyền thương hiệu Fiona mang đến cho quý khách trải nghiệm thời trang công sở thời thượng và hiện đại.<br> - Đầm ren dáng xòe, cổ xuông, nhún trang trí.<br> - Chất liệu ren đứng phom, co giãn nhẹ.'
    },
    {
        title: 'LƯU Ý',
        body: 'Bảng size chart đầm thiết kế nữ chỉ mang tính chất tham khảo, tùy thuộc vào số đo cơ thể mỗi người và chất liệu vải khác nhau sẽ có sự chênh lệch nhất định từ 1 - 2cm.<br> Màu sắc sản phẩm đầm thiết kế có thể chênh lệch thực tế một phần nhỏ do ảnh hưởng hưởng về ánh sáng.<br> Nàng hãy luôn chú ý các quy tắc sau để chiếc đầm xòe công sở yêu thích luôn bền đẹp: <br> + Lộn mặt trái khi giặt và phơi sản phẩm + Giặt đầm nữ với xà phòng trung tính <br> + Không phơi trực tiếp dưới ánh nắng mặt trời <br> + Giặt máy ở chế độ nhẹ nhàng. Không sấy, phơi khô tự nhiên.'
    }
]

const AddProdModal = ({ display, toggleAddModal }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategoriesThunk())
    }, [dispatch])
    const [name, setName] = useState('')
    const [tag, setTag] = useState('')
    const [cateId, setCateId] = useState()
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [price, setPrice] = useState('')
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [desc, setDesc] = useState('')

    const isLoading = useSelector((state) => state.category.loading)
    const [loading, setLoading] = useState(isLoading)
    useEffect(() => {
        setLoading(isLoading)
    }, [isLoading])
    const cateList = useSelector((state) => state.category.categories)
    const [categories, setCategories] = useState(cateList)

    useEffect(() => {
        setCategories(cateList)
    }, [cateList])

    const handelSubmit = (e) => {
        e.preventDefault()
        let images = []
        if (image1 !== '') images.push(image1)
        if (image2 !== '') images.push(image2)
        if (image3 !== '') images.push(image3)

        const colorsData = colors.map((color) => color.value)
        const sizesData = sizes.map((size) => size.value)
        descs[0].body = desc
        const formData = {
            id: v4(),
            name,
            tag,
            cateId,
            images,
            price,
            colors: colorsData,
            sizes: sizesData,
            desc: descs
        }
        console.log(formData)
        dispatch(createProdThunk(formData))
        if (!loading) {
            toggleAddModal()
            toast.success('Thêm sản phẩm thành công !')
        }
    }
    return (
        <div className={`modal-admin ${display}`}>
            <div className="modal-admin__content">
                <div className="modal-admin__content__title">
                    <h3>Thêm mới sản phẩm</h3>
                </div>
                <div className="modal-admin__content__body">
                    <form onSubmit={(e) => handelSubmit(e)}>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="name">Tên:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Nhập tên sản phẩm..."
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="tag">Chọn loại: </label>
                            <Select
                                onChange={(e) => setTag(e.value)}
                                options={[
                                    { value: 'new', label: 'New' },
                                    { value: 'popular', label: 'Popular' },
                                    { value: 'seller', label: 'Seller' }
                                ]}
                            />
                        </div>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="cate">Chọn danh mục: </label>
                            <Select
                                onChange={(e) => setCateId(e.value)}
                                options={[...categories.map((cate) => ({ value: cate.id, label: cate.name }))]}
                            />
                        </div>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="image">Hình ảnh:</label>
                            <input
                                value={image1}
                                onChange={(e) => setImage1(e.target.value)}
                                type="text"
                                id="image"
                                placeholder="Nhập url hình ảnh..."
                                required
                            />
                            <input
                                value={image2}
                                onChange={(e) => setImage2(e.target.value)}
                                type="text"
                                placeholder="Nhập url hình ảnh..."
                            />
                            <input
                                value={image3}
                                onChange={(e) => setImage3(e.target.value)}
                                type="text"
                                placeholder="Nhập url hình ảnh..."
                            />
                        </div>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="price">Giá:</label>
                            <input
                                type="text"
                                id="price"
                                value={price}
                                placeholder="Nhập giá..."
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="colors">Chọn màu sắc: </label>
                            <Select
                                onChange={(e) => setColors(e)}
                                isMulti
                                name="colors"
                                options={[...colorList.map((color) => ({ value: color, label: color }))]}
                                className="basic-multi-select"
                                classNamePrefix="selectColor"
                            />
                        </div>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="sizes">Chọn size: </label>
                            <Select
                                onChange={(e) => setSizes(e)}
                                isMulti
                                name="sizes"
                                options={[...sizeList.map((size) => ({ value: size, label: size }))]}
                                className="basic-multi-select"
                                classNamePrefix="selectSize"
                            />
                        </div>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="desc">Mô tả:</label>
                            <textarea
                                onChange={(e) => setDesc(e.target.value)}
                                type="text"
                                id="desc"
                                rows={5}
                                placeholder="Nhập mô tả..."
                                required
                            />
                        </div>

                        <div className="modal-admin__content__body__btn">
                            <Button size="sm">Thêm mới</Button>
                        </div>
                    </form>
                </div>
                <div className="modal-admin__content__btn">
                    <Button size="sm" onClick={toggleAddModal}>
                        Đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddProdModal

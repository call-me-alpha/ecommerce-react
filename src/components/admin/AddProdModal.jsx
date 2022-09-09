import { useEffect, useState, useMemo } from 'react'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import Button from '../Button'
import { createProdThunk } from '../../redux/productSlice'

const tags = ['new', 'popular', 'seller']
const tagOptions = [...tags.map((tag) => ({ value: tag, label: tag }))]
const sizeList = ['S', 'M', 'L', 'XL', 'XXL']
const sizeOptions = [...sizeList.map((size) => ({ value: size, label: size }))]
const colorList = ['white', 'blue', 'orange', 'pink', 'black', 'red', 'brown', 'beige', 'yellow', 'grey']
const colorOptinos = [...colorList.map((color) => ({ value: color, label: color }))]
const descs = [
    {
        title: 'THÔNG TIN CHI TIẾT SẢN PHẨM',
        body: ''
    },
    {
        title: 'ĐIỂM NỔI BẬT CỦA SẢN PHẨM',
        body: '- FIONA là thương hiệu thời trang nữ công sở cao cấp được các chị em rất tin tưởng sử dụng.<br>- Sản phẩm thiết kế độc quyền thương hiệu Fiona mang đến cho quý khách trải nghiệm thời trang công sở thời thượng và hiện đại.<br>- Sản phẩm thiết kế đẹp mới nhất cho nàng luôn xinh đẹp và sành điệu.<br>- Chất liệu cao cấp giúp chiếc đầm công sở thiết kế luôn giữ phom vô cùng xinh đẹp và thanh lịch.'
    },
    {
        title: 'LƯU Ý',
        body: 'Bảng size chart đầm thiết kế nữ chỉ mang tính chất tham khảo, tùy thuộc vào số đo cơ thể mỗi người và chất liệu vải khác nhau sẽ có sự chênh lệch nhất định từ 1 - 2cm.<br> Màu sắc sản phẩm đầm thiết kế có thể chênh lệch thực tế một phần nhỏ do ảnh hưởng hưởng về ánh sáng.<br> Nàng hãy luôn chú ý các quy tắc sau để chiếc đầm xòe công sở yêu thích luôn bền đẹp: <br> + Lộn mặt trái khi giặt và phơi sản phẩm + Giặt đầm nữ với xà phòng trung tính <br> + Không phơi trực tiếp dưới ánh nắng mặt trời <br> + Giặt máy ở chế độ nhẹ nhàng. Không sấy, phơi khô tự nhiên.'
    }
]

const AddProdModal = ({ display, toggleAddModal }) => {
    const dispatch = useDispatch()
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

    const cateOptions = useMemo(
        () => [...categories.map((cate) => ({ value: cate.id, label: cate.name }))],
        [categories]
    )
    const handelSubmit = (e) => {
        e.preventDefault()
        let images = []
        if (image1 !== '') images.push(image1)
        if (image2 !== '') images.push(image2)
        if (image3 !== '') images.push(image3)

        descs[0].body = desc
        const formData = {
            id: v4(),
            name,
            tag,
            cateId,
            images,
            price: +price,
            colors,
            sizes,
            desc: descs
        }
        dispatch(createProdThunk(formData))
        setName('')
        setTag('')
        setCateId('')
        setImage1('')
        setImage2('')
        setImage3('')
        setPrice('')
        setColors([])
        setSizes([])
        setDesc('')
        if (!loading) {
            toggleAddModal()
            toast.success('Thêm sản phẩm thành công !')
        }
    }
    const indexColor = useMemo(() => {
        let temp = []
        if (colors) {
            colors.forEach((color) => {
                let index = colorOptinos.findIndex((item) => item.value === color)
                if (index !== -1) {
                    temp.push(index)
                }
            })
        }
        return temp
    }, [colors])
    const indexSize = useMemo(() => {
        let temp = []
        if (sizes) {
            sizes.forEach((size) => {
                let index = sizeOptions.findIndex((item) => item.value === size)
                if (index !== -1) {
                    temp.push(index)
                }
            })
        }
        return temp
    }, [sizes])
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
                                value={tagOptions[tagOptions.findIndex((item) => item.value === tag)] || ''}
                                onChange={(e) => setTag(e.value)}
                                options={tagOptions}
                            />
                        </div>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="cate">Chọn danh mục: </label>
                            <Select
                                value={cateOptions[cateOptions.findIndex((item) => item.value === cateId)] || ''}
                                onChange={(e) => setCateId(e.value)}
                                options={cateOptions}
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
                                value={indexColor.map((item) => colorOptinos[item]) || ''}
                                onChange={(e) => setColors(e.map((item) => item.value))}
                                isMulti
                                name="colors"
                                options={colorOptinos}
                                className="basic-multi-select"
                                classNamePrefix="selectColor"
                            />
                        </div>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="sizes">Chọn size: </label>
                            <Select
                                value={indexSize.map((item) => sizeOptions[item]) || ''}
                                onChange={(e) => setSizes(e.map((item) => item.value))}
                                isMulti
                                name="sizes"
                                options={sizeOptions}
                                className="basic-multi-select"
                                classNamePrefix="selectSize"
                            />
                        </div>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="desc">Mô tả:</label>
                            <textarea
                                value={desc}
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

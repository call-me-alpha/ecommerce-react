import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Helmet from '../../components/Helmet'
import productApi from '../../api/productApi'
import Table from '../../components/admin/Table'
import Badge from '../../components/admin/Badge'
import { deleteProdThunk } from '../../redux/productSlice'
import AddProdModal from '../../components/admin/AddProdModal'
import EditProdModal from '../../components/admin/EditProdModal'

const headData = ['Hình ảnh', 'Tên', 'Kích cỡ', 'Màu sắc', 'Nhãn', 'Giá', 'Thao tác']
const renderHead = (item, index) => <th key={index}>{item}</th>
const renderBody = (item, index, handelDeleteCate, handelEditProd) => (
    <tr key={index}>
        <td>
            <img src={item.images[0]} alt="" />
        </td>
        <td>{item.name}</td>
        <td>
            {item.sizes.map((size, index) => (
                <span className="size" key={index}>
                    {size}
                </span>
            ))}
        </td>
        <td>
            <div className="color">
                {item.colors.map((color, index) => (
                    <div key={index} className={`color__cricle bg-${color}`}></div>
                ))}
            </div>
        </td>
        <td>
            <Badge status={item.tag} />
        </td>

        <td>{item.price.toLocaleString()} VNĐ</td>
        <td>
            <span className="btn__edit" onClick={() => handelEditProd(item.id)}>
                <i className="bx bxs-edit-alt"></i>
                <span>Sửa</span>
            </span>
            <span className="btn__delete" onClick={() => handelDeleteCate(item.id)}>
                <i className="bx bxs-x-square"></i>
                <span>Xoá</span>
            </span>
        </td>
    </tr>
)

const Product = () => {
    const dispatch = useDispatch()
    const prodList = useSelector((state) => state.product.products)
    const [products, setProducts] = useState(prodList)
    const [product, setProduct] = useState({})
    const [addModlal, setAddModal] = useState('')
    const [editModal, setEditModal] = useState('')
    const isLoading = useSelector((state) => state.category.loading)
    const [loading, setLoading] = useState(isLoading)
    useEffect(() => {
        setLoading(isLoading)
    }, [isLoading])

    const toggleAddModal = () => {
        setAddModal(addModlal === 'active' ? '' : 'active')
    }
    const toggleEditModal = () => {
        setEditModal(editModal === 'active' ? '' : 'active')
    }
    useEffect(() => {
        setProducts(prodList)
    }, [prodList])

    const handelDeleteCate = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xoá danh mục này ?')) {
            dispatch(deleteProdThunk(id))
            if (!loading) {
                toast.success('Xoá danh mục thành công !')
            }
        }
    }

    const handelEditProd = (id) => {
        const getProductServer = async (id) => {
            try {
                const res = await productApi.getOne(id)
                setProduct(res)
                toggleEditModal()
            } catch (err) {
                console.log(err)
            }
        }
        getProductServer(id)
    }

    return (
        <Helmet title="Quản lý sản phẩm">
            <div className="page">
                <div className="page__title">Quản lý sản phẩm</div>
                <div className="page__btn" onClick={() => setAddModal('active')}>
                    <i className="bx bx-plus"></i>
                    <span>Thêm mới</span>
                </div>
                <div className="page__table">
                    {products.length ? (
                        <Table
                            limit={10}
                            headData={headData}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={products}
                            renderBody={(item, index) => renderBody(item, index, handelDeleteCate, handelEditProd)}
                        />
                    ) : (
                        <div className="loading">
                            <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                        </div>
                    )}
                </div>
            </div>
            <AddProdModal display={addModlal} toggleAddModal={toggleAddModal} />
            <EditProdModal display={editModal} toggleEditModal={toggleEditModal} product={product} />
        </Helmet>
    )
}

export default Product

import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useDispatch, useSelector } from 'react-redux'

import Helmet from '../../components/Helmet'
// import productApi from '../../api/productApi'
import Table from '../../components/admin/Table'
import Badge from '../../components/admin/Badge'
import { getProductsThunk } from '../../redux/productSlice'
import AddProdModal from '../../components/admin/AddProdModal'
// import { getCategoriesThunk } from '../../redux/categorySlice'

const headData = ['', 'Hình ảnh', 'Tên', 'Nhãn', 'Giá', 'Thao tác']
const renderHead = (item, index) => <th key={index}>{item}</th>
const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>
            <img src={item.images[0]} alt="" />
        </td>
        <td>{item.name}</td>
        <td>
            <Badge status={item.tag} />
        </td>
        <td>{item.price.toLocaleString()} VNĐ</td>
        <td>
            <span className="btn__edit">
                <i className="bx bxs-edit-alt"></i>
                <span>Sửa</span>
            </span>
            <span className="btn__delete">
                <i className="bx bxs-x-square"></i>
                <span>Xoá</span>
            </span>
        </td>
    </tr>
)

const Product = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductsThunk())
    }, [dispatch])
    const prodList = useSelector((state) => state.product.products)
    const [products, setProducts] = useState(prodList)
    const [addModlal, setAddModal] = useState('')
    const [editModal, setEditModal] = useState('')
    // const isLoading = useSelector((state) => state.category.loading)
    // const [loading, setLoading] = useState(isLoading)
    // useEffect(() => {
    //     setLoading(isLoading)
    // }, [isLoading])

    const toggleAddModal = () => {
        setAddModal(addModlal === 'active' ? '' : 'active')
    }
    const toggleEditModal = () => {
        setEditModal(editModal === 'active' ? '' : 'active')
    }
    useEffect(() => {
        setProducts(prodList)
    }, [prodList])

    console.log(products)

    // const handelDeleteCate = (id) => {
    //     if (window.confirm('Bạn có chắc chắn muốn xoá danh mục này ?')) {
    //         dispatch(deleteCateThunk(id))
    //         if (!loading) {
    //             toast.success('Xoá danh mục thành công !')
    //         }
    //     }
    // }

    // const handelEditCate = (id) => {
    //     const getCateServer = async (id) => {
    //         try {
    //             const res = await categoryApi.getOne(id)
    //             setCateEdit(res)
    //             toggleEditModal()
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     getCateServer(id)
    // }

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
                            renderBody={(item, index) => renderBody(item, index)}
                        />
                    ) : (
                        <div className="loading">
                            <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                        </div>
                    )}
                </div>
            </div>
            <AddProdModal display={addModlal} toggleAddModal={toggleAddModal} />
        </Helmet>
    )
}

export default Product

import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesThunk, deleteCateThunk } from '../../redux/categorySlice'

import categoryApi from '../../api/categoryApi'
import Helmet from '../../components/Helmet'
import Table from '../../components/admin/Table'
import AddCateModal from '../../components/admin/AddCateModal'
import EditCateModal from '../../components/admin/EditCateModal'

const headData = ['ID', 'Tên', 'Thao tác']
const renderHead = (item, index) => <th key={index}>{item}</th>
const renderBody = (item, index, handelDeleteCate, handelEditCate) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>
            <span className="btn__edit" onClick={() => handelEditCate(item.id)}>
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

const Category = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategoriesThunk())
    }, [dispatch])
    const cateList = useSelector((state) => state.category.categories)
    const [categories, setCategories] = useState(cateList)
    const isLoading = useSelector((state) => state.category.loading)
    const [loading, setLoading] = useState(isLoading)
    useEffect(() => {
        setLoading(isLoading)
    }, [isLoading])

    useEffect(() => {
        setCategories(cateList)
    }, [cateList])
    const [addModlal, setAddModal] = useState('')
    const [editModal, setEditModal] = useState('')
    const [cateEdit, setCateEdit] = useState({})

    const toggleAddModal = () => {
        setAddModal(addModlal === 'active' ? '' : 'active')
    }
    const toggleEditModal = () => {
        setEditModal(editModal === 'active' ? '' : 'active')
    }

    const handelDeleteCate = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xoá danh mục này ?')) {
            dispatch(deleteCateThunk(id))
            if (!loading) {
                toast.success('Xoá danh mục thành công !')
            }
        }
    }

    const handelEditCate = (id) => {
        const getCateServer = async (id) => {
            try {
                const res = await categoryApi.getOne(id)
                setCateEdit(res)
                toggleEditModal()
            } catch (err) {
                console.log(err)
            }
        }
        getCateServer(id)
    }
    return (
        <Helmet title="Quản lý sản phẩm">
            <div className="page">
                <div className="page__title">Quản lý danh mục</div>
                <div className="page__btn" onClick={() => setAddModal('active')}>
                    <i className="bx bx-plus"></i>
                    <span>Thêm mới</span>
                </div>
                <div className="page__table">
                    {categories.length ? (
                        <Table
                            limit={10}
                            headData={headData}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={categories}
                            renderBody={(item, index) => renderBody(item, index, handelDeleteCate, handelEditCate)}
                        />
                    ) : (
                        <div className="loading">
                            <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                        </div>
                    )}
                </div>
            </div>
            <AddCateModal display={addModlal} toggleAddModal={toggleAddModal} />
            <EditCateModal display={editModal} toggleEditModal={toggleEditModal} cateEdit={cateEdit} />
        </Helmet>
    )
}

export default Category

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import Button from '../Button'
import { updateCateThunk } from '../../redux/categorySlice'

const EditCateModal = ({ display, toggleEditModal, cateEdit }) => {
    const dispatch = useDispatch()
    const [id, setId] = useState(cateEdit.id)
    const [name, setName] = useState(cateEdit.name)
    useEffect(() => {
        setId(cateEdit.id)
        setName(cateEdit.name)
    }, [cateEdit])
    const handelSubmit = (e) => {
        e.preventDefault()
        const formData = {
            id,
            name
        }
        dispatch(updateCateThunk(formData))
        toast.success('Chỉnh sửa danh mục thành công !')
        toggleEditModal()
    }

    return (
        <div className={`modal-admin ${display}`}>
            <div className="modal-admin__content">
                <div className="modal-admin__content__title">
                    <h3>Sửa danh mục</h3>
                </div>
                <div className="modal-admin__content__body">
                    <form onSubmit={(e) => handelSubmit(e)}>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="name">Tên danh mục:</label>
                            <input
                                type="text"
                                required
                                name="name"
                                value={name || ''}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="modal-admin__content__body__btn">
                            <Button size="sm">Xác nhận</Button>
                        </div>
                    </form>
                </div>
                <div className="modal-admin__content__btn">
                    <Button size="sm" onClick={toggleEditModal}>
                        Đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditCateModal

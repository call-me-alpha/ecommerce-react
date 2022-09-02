import { useState } from 'react'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import Button from '../Button'
import { createCateThunk } from '../../redux/categorySlice'

const AddCateModal = ({ display, toggleAddModal }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handelSubmit = (e) => {
        e.preventDefault()
        console.log(name)
        const formData = {
            id: v4(),
            name
        }
        dispatch(createCateThunk(formData))
        setName('')
        toggleAddModal()
        toast.success('Thêm danh mục thành công !')
    }
    return (
        <div className={`modal-admin ${display}`}>
            <div className="modal-admin__content">
                <div className="modal-admin__content__title">
                    <h3>Thêm mới danh mục</h3>
                </div>
                <div className="modal-admin__content__body">
                    <form onSubmit={(e) => handelSubmit(e)}>
                        <div className="modal-admin__content__body__form-group">
                            <label htmlFor="name">Tên danh mục:</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Nhập tên danh mục..."
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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

export default AddCateModal

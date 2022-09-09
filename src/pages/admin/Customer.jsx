import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { getUsersThunk, updateRoleThunk } from '../../redux/userSlice'
import Helmet from '../../components/Helmet'
import Table from '../../components/admin/Table'
import Badge from '../../components/admin/Badge'

const headData = ['', 'Hình ảnh', 'Tên', 'Email', 'Vai trò', 'Thao tác']
const renderHead = (item, index) => <th key={index}>{item}</th>
const renderBody = (item, index, handelUpdateRole) => (
    <tr key={index}>
        <td>{index + 1}</td>
        <td>
            <img src={item.avatar} className="avatar" alt="" />
        </td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>
            <Badge status={item.role} />
        </td>
        <td>
            <span
                className="btn__edit"
                onClick={() => handelUpdateRole(item.id, item.role === 'admin' ? 'user' : 'admin')}
            >
                <i className="bx bxs-edit-alt"></i>
                <span>Đặt làm {item.role === 'admin' ? 'user' : 'admin'}</span>
            </span>
        </td>
    </tr>
)

const Customer = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])

    const users = useSelector((state) => state.user.users)
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        setCustomers(users)
    }, [users])
    const handelUpdateRole = (id, role) => {
        if (window.confirm(`Bạn muốn chỉnh sửa vai trò người này thành ${role}`)) {
            dispatch(updateRoleThunk({ id, role }))
            toast.success('Chỉnh sửa vai trò thành công !')
        }
    }
    console.log(customers)
    return (
        <Helmet title="Quản lý người dùng">
            <div className="page">
                <div className="page__title">Quản lý người dùng</div>
                <div className="page__table">
                    {customers.length ? (
                        <Table
                            limit={10}
                            headData={headData}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={customers}
                            renderBody={(item, index) => renderBody(item, index, handelUpdateRole)}
                        />
                    ) : (
                        <div className="loading">
                            <ReactLoading type="spinningBubbles" height={50} width={50} color="#f5801f" />
                        </div>
                    )}
                </div>
            </div>
        </Helmet>
    )
}

export default Customer

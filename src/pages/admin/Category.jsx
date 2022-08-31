import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'

import categoryApi from '../../api/categoryApi'
import Helmet from '../../components/Helmet'
import Table from '../../components/admin/Table'

const headData = ['', 'Tên', 'Thao tác']
const renderHead = (item, index) => <th key={index}>{item}</th>
const renderBody = (item, index) => (
    <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
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

const Category = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const getProductsServer = async () => {
            try {
                const res = await categoryApi.getAll()
                setCategories(res)
            } catch (err) {
                console.log(err)
            }
        }
        getProductsServer()
    }, [])

    console.log(categories)
    return (
        <Helmet title="Quản lý sản phẩm">
            <div className="page">
                <div className="page__title">Quản lý danh mục</div>
                <div className="page__table">
                    {categories.length ? (
                        <Table
                            limit={10}
                            headData={headData}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={categories}
                            renderBody={(item, index) => renderBody(item, index)}
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

export default Category

import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'

import Helmet from '../../components/Helmet'
import productApi from '../../api/productApi'
import Table from '../../components/admin/Table'
import Badge from '../../components/admin/Badge'

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
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProductsServer = async () => {
            try {
                const res = await productApi.getAll()
                setProducts(res)
            } catch (err) {
                console.log(err)
            }
        }
        getProductsServer()
    }, [])

    console.log(products)
    return (
        <Helmet title="Quản lý sản phẩm">
            <div className="page">
                <div className="page__title">Quản lý sản phẩm</div>
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
        </Helmet>
    )
}

export default Product

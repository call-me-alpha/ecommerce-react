import React from 'react'

const Table = ({ thead, tfoot, data }) => {
    return (
        <div className="table">
            <table>
                <thead>{thead}</thead>
                <tbody>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên</th>
                        <th>Email</th>
                    </tr>
                    {customers.map((cust) => (
                        <tr key={cust.id}>
                            <td>
                                <img src={cust.avatar} alt="" />
                            </td>
                            <td>{cust.name}</td>
                            <td>{cust.email}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <Link to="customers">View All</Link>
                </tfoot>
            </table>
        </div>
    )
}

export default Table

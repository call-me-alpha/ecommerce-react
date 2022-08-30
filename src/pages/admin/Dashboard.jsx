import { Link } from 'react-router-dom'

import Grid from '../../components/Grid'
import StatisticalItem from '../../components/admin/StatisticalItem'
import { useEffect, useState } from 'react'
import userApi from '../../api/userApi'

const Dashboard = () => {
    const [customers, setCustomers] = useState([])
    const statisticals = [
        {
            icon: 'bx bx-shopping-bag',
            count: '1,995',
            title: 'Total sales'
        },
        {
            icon: 'bx bx-cart',
            count: '2,001',
            title: 'Daily visits'
        },
        {
            icon: 'bx bx-dollar-circle',
            count: '$2,632',
            title: 'Total income'
        },
        {
            icon: 'bx bx-receipt',
            count: '1,711',
            title: 'Total orders'
        }
    ]
    useEffect(() => {
        const getCustoterServer = async () => {
            try {
                const res = await userApi.getAll()
                setCustomers(res.splice(0, 5))
            } catch (err) {
                console.log(err)
            }
        }
        getCustoterServer()
    }, [])
    console.log(customers)
    return (
        <div className="dashboard">
            <h2 className="dashboard__title">Dashboard</h2>
            <div className="dashboard__statistical">
                <Grid col={4} mdCol={2} smCol={1} gap={20}>
                    {statisticals.map((item, index) => (
                        <StatisticalItem key={index} title={item.title} icon={item.icon} count={item.count} />
                    ))}
                </Grid>
            </div>
            <div className="dashboard__table">
                <Grid col={2} mdCol={1} smCol={1} gap={20}>
                    <div className="dashboard__table__item">
                        <div className="dashboard__table__item__title">Khách hàng mới</div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                </tr>
                                {customers
                                    ? customers.map((cust) => (
                                          <tr key={cust.id}>
                                              <td>
                                                  <img src={cust.avatar} alt="" />
                                              </td>
                                              <td>{cust.name}</td>
                                              <td>{cust.email}</td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </table>
                        <div className="dashboard__table__item__link">
                            <Link to="customers">View All</Link>
                        </div>
                    </div>
                    <div className="dashboard__table__item">
                        <div className="dashboard__table__item__title">Đơn hàng mới</div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                </tr>
                                {customers
                                    ? customers.map((cust) => (
                                          <tr key={cust.id}>
                                              <td>
                                                  <img src={cust.avatar} alt="" />
                                              </td>
                                              <td>{cust.name}</td>
                                              <td>{cust.email}</td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </table>
                        <div className="dashboard__table__item__link">
                            <Link to="customers">View All</Link>
                        </div>
                    </div>
                </Grid>
            </div>
        </div>
    )
}

export default Dashboard

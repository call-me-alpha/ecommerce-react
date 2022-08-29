import Grid from '../../components/Grid'
import StatisticalItem from '../../components/admin/StatisticalItem'

const Dashboard = () => {
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
        </div>
    )
}

export default Dashboard

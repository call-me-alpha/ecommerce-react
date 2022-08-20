import Grid from './Grid'

const policys = [
    {
        name: 'Miễn phí giao hàng',
        descipton: 'Miễn phí ship với đơn hàng > 499k',
        icon: 'bx bxs-truck'
    },
    {
        name: 'Thanh toán COD',
        descipton: 'Thanh toán khi nhận hàng (COD)',
        icon: 'bx bx-wallet-alt'
    },
    {
        name: 'Khách hàng VIP',
        descipton: 'Ưu đãi dành cho khách hàng VIP',
        icon: 'bx bx-diamond'
    },
    {
        name: 'Hỗ trợ bảo hành',
        descipton: 'Đổi sửa đồ tại tất cả store Fiona',
        icon: 'bx bx-cut'
    }
]
const Policy = () => {
    return (
        <Grid col={4} mdCol={2} smCol={2} gap={20}>
            {policys.map((item, index) => (
                <div className="policy-card" key={index}>
                    <div className="policy-card__icon">
                        <i className={item.icon}></i>
                    </div>
                    <div className="policy-card__info">
                        <div className="policy-card__info__name">{item.name}</div>
                        <div className="policy-card__info__desc">{item.descipton}</div>
                    </div>
                </div>
            ))}
        </Grid>
    )
}

export default Policy

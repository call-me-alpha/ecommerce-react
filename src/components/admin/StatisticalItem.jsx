const StatisticalItem = ({ title, count, icon }) => {
    return (
        <div className="dashboard__statistical__item">
            <div className="dashboard__statistical__item__icon">
                <i className={icon}></i>
            </div>
            <div className="dashboard__statistical__item__info">
                <h4>{count}</h4>
                <span>{title}</span>
            </div>
        </div>
    )
}

export default StatisticalItem

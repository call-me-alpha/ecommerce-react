import React from 'react'

const Badge = ({ status }) => {
    return <span className={`badge badge-${status}`}>{status}</span>
}

export default Badge

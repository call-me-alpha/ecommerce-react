import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import orderApi from '../api/orderApi'

function MyOrder() {
    const dispatch = useDispatch()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const user = useSelector((state) => state.user.currentUser)
    const [orders, setOrders] = useState([])
    const [curentUser, setCurentUser] = useState({})
    useEffect(() => {
        const getOrderServer = async () => {
            const res = await orderApi.getAll()
            setOrders(res)
        }
        getOrderServer()
    }, [])
    useEffect(() => {
        setCurentUser(user)
    }, [user])
    const myOrders = useMemo(() => {
        if (orders && curentUser) {
            return orders.filter((item) => item.custId === curentUser.id)
        }
    }, [orders, curentUser])
    console.log(myOrders)
    return <div>MyOrder</div>
}

export default MyOrder

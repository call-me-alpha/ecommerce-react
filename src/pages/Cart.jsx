import { useSelector } from 'react-redux'

import Helmet from '../components/Helmet'
import PolicyItem from '../components/PolicyItem'
import Section, { SectionBody } from '../components/Section'
import CartInfo from '../components/CartInfo'

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.value)
    console.log(cartItems)

    return (
        <Helmet title="Giỏ hàng">
            <CartInfo cartItems={cartItems} />
            <Section>
                <SectionBody>
                    <PolicyItem />
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Cart

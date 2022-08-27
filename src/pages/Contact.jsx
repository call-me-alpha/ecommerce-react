import { useEffect } from 'react'

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return <div style={{ height: '100vh' }}>Contact</div>
}

export default Contact

import { useEffect } from 'react'

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return <div style={{ height: '100vh' }}>About</div>
}

export default About

import { useEffect, useRef } from 'react'

const GoToTop = () => {
    const goToTopRef = useRef()
    useEffect(() => {
        const handelGoToTop = () => {
            document.body.scrollTop > 80 || document.documentElement.scrollTop > 100
                ? goToTopRef.current.classList.add('active')
                : goToTopRef.current.classList.remove('active')
        }
        window.addEventListener('scroll', handelGoToTop)
        return () => {
            window.removeEventListener('scroll', handelGoToTop)
        }
    })
    const handelClick = () => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }
    return (
        <div ref={goToTopRef} className="gototop" onClick={handelClick}>
            <div className="gototop__icon">
                <i className="bx bx-chevron-up-circle"></i>
            </div>
        </div>
    )
}

export default GoToTop

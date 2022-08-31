import { useEffect, useState } from 'react'

const Table = (props) => {
    const [dataShow, setDataShow] = useState([])
    const [currPage, setCurrPage] = useState(0)

    useEffect(() => {
        const initDataShow = props.limit ? props.bodyData.slice(0, props.limit) : props.bodyData
        setDataShow(initDataShow)
    }, [props])
    let totalPage = 1
    let pageNumbers = []

    if (props.limit !== undefined) {
        totalPage = Math.ceil(props.bodyData.length / +props.limit)
        for (let i = 0; i < totalPage; i++) {
            pageNumbers.push(i)
        }
    }

    const selectPage = (indexNewPage) => {
        const startIndex = +props.limit * indexNewPage
        const endIndex = startIndex + +props.limit

        setDataShow(props.bodyData.slice(startIndex, endIndex))
        setCurrPage(indexNewPage)
    }
    return (
        <div className="table">
            <table>
                {props.headData && props.renderHead ? (
                    <thead>
                        <tr>{props.headData.map((item, index) => props.renderHead(item, index))}</tr>
                    </thead>
                ) : null}
                {props.bodyData && props.renderBody ? (
                    <tbody>{dataShow.map((item, index) => props.renderBody(item, index))}</tbody>
                ) : null}
            </table>
            {totalPage > 1 ? (
                <div className="table__pagination">
                    {pageNumbers.map((item) => (
                        <div
                            className={`table__pagination__item ${currPage === item ? 'active' : ''} `}
                            key={item}
                            onClick={() => selectPage(item)}
                        >
                            {item + 1}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default Table

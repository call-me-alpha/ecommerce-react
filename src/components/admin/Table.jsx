const Table = (props) => {
    return (
        <div className="table">
            <table>
                {props.headData && props.renderHead ? (
                    <thead>
                        <tr>{props.headData.map((item, index) => props.renderHead(item, index))}</tr>
                    </thead>
                ) : null}
                {props.bodyData && props.renderBody ? (
                    <tbody>{props.bodyData.map((item, index) => props.renderBody(item, index))}</tbody>
                ) : null}
            </table>
        </div>
    )
}

export default Table

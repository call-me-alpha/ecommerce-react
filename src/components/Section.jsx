const Section = (props) => {
    return <section className="section">{props.children}</section>
}
const SectionTitle = (props) => {
    return <div className="section__title">{props.children}</div>
}
const SectionBody = (props) => {
    return <section className="section__body">{props.children}</section>
}

export { SectionTitle, SectionBody }
export default Section

const Section = ({ children }) => {
    return <section className="section">{children}</section>
}
const SectionTitle = ({ children }) => {
    return <div className="section__title">{children}</div>
}
const SectionBody = ({ children }) => {
    return <section className="section__body">{children}</section>
}

export { SectionTitle, SectionBody }
export default Section

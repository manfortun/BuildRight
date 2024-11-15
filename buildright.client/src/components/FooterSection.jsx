const FooterSection = ({ children, title = "" }) => {
    return (
        <div className="d-flex flex-column justify-content-start align-items-start">
            {title && title.length > 0 && (
                <h4 className="fw-bold">{title}</h4>
            ) }
            {children }
        </div>
    )
}

export default FooterSection;
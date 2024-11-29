import BorderContainer from "./BorderContainer";

const ServiceHighlightTitleWithLink = ({ label, description, href, height, backgroundSrc }) => {

    return (
        <BorderContainer clickable={true} backgroundSrc={backgroundSrc} height={height}>
            <a href={href} style={{zIndex: '1'} }>
                <h4>{label}</h4>
                {description && description.length > 0 && (
                    <i>{description}</i>
                )}
            </a>
        </BorderContainer>
    )
}

export default ServiceHighlightTitleWithLink;
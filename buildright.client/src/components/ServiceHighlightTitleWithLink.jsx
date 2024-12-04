import PropTypes from 'prop-types';
import BorderContainer from "./BorderContainer";

const ServiceHighlightTitleWithLink = ({ label, description, href, height, backgroundSrc }) => {

    return (
        <BorderContainer hasPointerEvents={true} backgroundSrc={backgroundSrc} height={height}>
            <a href={href} style={{zIndex: '1'} }>
                <h4>{label}</h4>
                {description && description.length > 0 && (
                    <i>{description}</i>
                )}
            </a>
        </BorderContainer>
    )
}

ServiceHighlightTitleWithLink.propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    href: PropTypes.string,
    height: PropTypes.number,
    backgroundSrc: PropTypes.string
}

export default ServiceHighlightTitleWithLink;
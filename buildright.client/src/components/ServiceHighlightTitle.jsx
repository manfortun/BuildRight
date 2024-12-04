import PropTypes from 'prop-types';
import BorderContainer from "./BorderContainer";

const ServiceHighlightTitle = ({ label, description, height, backgroundSrc }) => {
    return (
        <BorderContainer hasPointerEvents={false} backgroundSrc={backgroundSrc} height={height ?? 'auto' }>
            <h4>{label}</h4>
            {description?.length > 0 && (
                <i>{description}</i>
            )}
        </BorderContainer>
    )
};

ServiceHighlightTitle.propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    height: PropTypes.number,
    backgroundSrc: PropTypes.string
}

export default ServiceHighlightTitle;
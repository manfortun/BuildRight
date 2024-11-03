import BorderContainer from "./BorderContainer";

const ServiceHighlightTitle = ({ label, description, height = "auto", backgroundSrc = "" }) => {
    return (
        <BorderContainer clickable={false} backgroundSrc={backgroundSrc} height={height }>
            <h4>{label}</h4>
            {description && description.length > 0 && (
                <i>{description}</i>
            )}
        </BorderContainer>
    )
};

export default ServiceHighlightTitle;
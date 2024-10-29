import BorderContainer from "./BorderContainer";

const ServiceHighlightTitle = ({ label, description }) => {
    return (
        <BorderContainer clickable={false}>
            <h4>{label}</h4>
            {description && description.length > 0 && (
                <i>{description}</i>
            )}
        </BorderContainer>
    )
};

export default ServiceHighlightTitle;
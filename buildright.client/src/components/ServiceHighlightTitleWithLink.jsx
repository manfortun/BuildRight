import { useEffect } from "react";
import BorderContainer from "./BorderContainer";

const ServiceHighlightTitleWithLink = ({ label, description, href }) => {
    useEffect(() => {
        console.log(href);
    }, []);
    return (
        <BorderContainer clickable={true}>
            <a href={href} style={{ all: 'unset'} }>
                <h4>{label}</h4>
                {description && description.length > 0 && (
                    <i>{description}</i>
                )}
            </a>
        </BorderContainer>
    )
}

export default ServiceHighlightTitleWithLink;
import { forwardRef, useState } from "react";
import Base__edit from "./Base__edit";

const ServiceHighlightTitleWithLink__edit = forwardRef((props, ref) => {
    const [newProperties, setNewProperties] = useState({
        id: props.id
    })
    return (
        <Base__edit id={newProperties.id}>
        </Base__edit>
    );
});

export default ServiceHighlightTitleWithLink__edit;
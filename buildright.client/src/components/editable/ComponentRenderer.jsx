import { useEffect, useState } from "react";
import { EditableComponentMap } from "../maps/componentMap";

const ComponentRenderer = ({ element }) => {
    const [Properties, setProperties] = useState(null);

    useEffect(() => {
        const { type } = element;
        let test = EditableComponentMap[`${type}__edit`] || null;

        if (test) {
            setProperties(test);
        }
    }, []);

    return (
        <form>
            {Properties}
        </form>
    )
}

export default ComponentRenderer;
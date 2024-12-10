import { forwardRef, useImperativeHandle, useState } from "react"
import Base__edit from "./Base__edit";
import TextInput from "./TextInput";

const SectionTitle__edit = forwardRef((props, ref) => {
    const [newProperties, setNewProperties] = useState({
        id: props.id,
        type: props.type,
        label: props.label,
        order: props.order,
        page: props.page
    });

    useImperativeHandle(ref, () => ({
        getProperties: () => newProperties
    }));

    const handlePropChange = (propName, value) => {
        setNewProperties(prev => ({ ...prev, [propName]: value }));
    }

    return (
        <Base__edit {...props}>
            <TextInput id={`${props.id}-label`} label="Label" placeholder='Label' onChange={(e) => handlePropChange('label', e.target.value)} value={newProperties.label} />
        </Base__edit>
    )
});

export default SectionTitle__edit;
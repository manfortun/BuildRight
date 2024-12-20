import { forwardRef, useImperativeHandle, useState } from "react";
import Base__edit from "./Base__edit";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import FileInput from "./FileInput";

const ServiceHighlightTitle__edit = forwardRef((props, ref) => {
    const [newProperties, setNewProperties] = useState({ ...props });
    const [newBgSrc, setNewBgSrc] = useState('');
    const [srcChanged, setSrcChanged] = useState(false);

    useImperativeHandle(ref, () => ({
        getProperties: () => newProperties,
    }));

    const handlePropChange = (propName, value) => {
        setNewProperties(prev => ({ ...prev, [propName]: value }));
    }

    return (
        <Base__edit {...props }>
            <TextInput id={`${props.id}-label`} label="Label" placeholder='Label' onChange={(e) => handlePropChange('label', e.target.value)} value={newProperties.label} />
            <TextInput id={`${props.id}-description`} label="Description" placeholder='Description' onChange={(e) => handlePropChange('description', e.target.value)} value={newProperties.description} />
            <NumberInput id={`${props.id}-height`} label="Height" placeholder='Height' onChange={(e) => handlePropChange('height', Number(e.target.value))} value={newProperties.height} />
            <FileInput id={`${props.id}-bgSrc`} label="Background image" placeholder='Background image' onChange={(e) => setNewBgSrc(e.target.value)} value={newBgSrc} initValue={newProperties.backgroundSrc} />
        </Base__edit>
    )
});

export default ServiceHighlightTitle__edit;
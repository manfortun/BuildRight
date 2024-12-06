import { forwardRef, useState } from "react";
import Base__edit from "./Base__edit";
import { useImperativeHandle } from "react";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import FileInput from "./FileInput";
import { useEffect } from "react";

const ServiceHighlightTitleWithLink__edit = forwardRef((props, ref) => {
    useEffect(() => {
        console.log(props);
    }, [])
    const [newProperties, setNewProperties] = useState({ ...props });
    const [newBgSrc, setNewBgSrc] = useState('');
    const [srcChanged, setSrcChanged] = useState(false);

    useImperativeHandle(ref, () => ({
        getProperties: () => newProperties,
    }));

    const handlePropChangeString = (propName, value) => {
        setNewProperties(prev => ({ ...prev, [propName]: value }));
    }

    const handlePropChangeInt = (propName, value) => {
        setNewProperties(prev => ({ ...prev, [propName]: Number(value) }));
    }

    return (
        <Base__edit {...props}>
            <TextInput id={`${props.id}-label`} label="Label" placeholder='Label' onChange={(e) => handlePropChangeString('label', e.target.value)} value={newProperties.label} />
            <TextInput id={`${props.id}-description`} label="Description" placeholder='Description' onChange={(e) => handlePropChangeString('description', e.target.value)} value={newProperties.description} />
            <NumberInput id={`${props.id}-height`} label="Height" placeholder='Height' onChange={(e) => handlePropChangeInt('height', e.target.value)} value={newProperties.height} />
            <TextInput id={`${props.id}-href`} label="Link" placeholder='Link' onChange={(e) => handlePropChangeString('href', e.target.value)} value={newProperties.href} />
            <FileInput id={`${props.id}-bgSrc`} label="Background image" placeholder='Background image' onChange={(e) => setNewBgSrc(e.target.value)} value={newBgSrc} initValue={newProperties.backgroundSrc} />
        </Base__edit>
    )
});

export default ServiceHighlightTitleWithLink__edit;
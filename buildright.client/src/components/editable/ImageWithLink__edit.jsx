import { forwardRef, useState } from "react";
import Base__edit from "./Base__edit";
import TextInput from "./TextInput";
import FileInput from "./FileInput";
import { useImperativeHandle } from "react";
// title, link, src
const ImageWithLink__edit = forwardRef((props, ref) => {
    const [newProperties, setNewProperties] = useState({ ...props });

    useImperativeHandle(ref, () => ({
        getProperties: () => ({
            ...newProperties,
            children: childReferences.current.map((childRef) => childRef.current?.getProperties()),
        })
    }));

    const handlePropChange = (propName, value) => {
        setNewProperties(prev => ({ ...prev, [propName]: value }));
    }

    return (
        <Base__edit {...props}>
            <TextInput id={`${props.id}-title`} value={newProperties.title} label='Title' placeholder='Title' onChange={(e) => handlePropChange('title', e.target.value)} />
            <TextInput id={`${props.id}-link`} value={newProperties.link} label='Link' placeholder='Link' onChange={(e) => handlePropChange('link', e.target.value)} />
            <FileInput id={`${props.id}-src`} label='Image' placeholder='Image' />
        </Base__edit>
    )
});

export default ImageWithLink__edit;
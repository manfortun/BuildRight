import { forwardRef, useImperativeHandle, useState } from "react";
import Base__edit from './Base__edit';
import FileInput from "./FileInput";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";

const PictureHeroWithTitle__edit = forwardRef((props, ref ) => {
    const [newProperties, setNewProperties] = useState({
        id: props.id,
        type: props.type,
        title: props.title,
        textColor: props.textColor,
        src: props.src,
        height: props.height,
        alt: props.alt,
        order: props.order,
        page: props.page
    });
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
        <Base__edit id={props.id }>
            <TextInput id={`${props.id}-title`} label="Title" placeholder='Title' onChange={(e) => handlePropChangeString('title', e.target.value)} value={newProperties.title} />
            <TextInput id={`${props.id}-textColor`} label="Text Color" placeholder='Text Color' onChange={(e) => handlePropChangeString('textColor', e.target.value)} value={newProperties.textColor} />
            <FileInput id={`${props.id}-src`} label="Background image" placeholder='Background image' onChange={(e) => setNewBgSrc(e.target.value)} value={newBgSrc} initValue={newProperties.src} />
            <NumberInput id={`${props.id}-height`} label="Height" placeholder='Height' onChange={(e) => handlePropChangeInt('height', e.target.value)} value={newProperties.height} />
            <TextInput id={`${props.id}-alt`} label="Alt" placeholder='Alt' onChange={(e) => handlePropChangeString('alt', e.target.value)} value={newProperties.alt} />
        </Base__edit>
    )
})

export default PictureHeroWithTitle__edit;
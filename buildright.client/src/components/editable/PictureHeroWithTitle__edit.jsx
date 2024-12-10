import { forwardRef, useImperativeHandle, useState } from "react";
import Base__edit from './Base__edit';
import FileInput from "./FileInput";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";

const PictureHeroWithTitle__edit = forwardRef((props, ref ) => {
    const [newProperties, setNewProperties] = useState({...props});
    const [newBgSrc, setNewBgSrc] = useState('');
    const [srcChanged, setSrcChanged] = useState(false);

    useImperativeHandle(ref, () => ({
        getProperties: () => newProperties,
    }));

    const handlePropChange = (propName, value) => {
        setNewProperties(prev => ({ ...prev, [propName]: value }));
    }

    return (
        <Base__edit id={props.id} type={props.type }>
            <TextInput id={`${props.id}-title`} label="Title" placeholder='Title' onChange={(e) => handlePropChange('title', e.target.value)} value={newProperties.title} />
            <TextInput id={`${props.id}-textColor`} label="Text Color" placeholder='Text Color' onChange={(e) => handlePropChange('textColor', e.target.value)} value={newProperties.textColor} />
            <NumberInput id={`${props.id}-height`} label="Height" placeholder='Height' onChange={(e) => handlePropChange('height', Number(e.target.value))} value={newProperties.height} />
            <TextInput id={`${props.id}-alt`} label="Alt" placeholder='Alt' onChange={(e) => handlePropChange('alt', e.target.value)} value={newProperties.alt} />
            <FileInput id={`${props.id}-src`} label="Background image" placeholder='Background image' onChange={(e) => setNewBgSrc(e.target.value)} value={newBgSrc} initValue={newProperties.src} />
        </Base__edit>
    )
})

export default PictureHeroWithTitle__edit;
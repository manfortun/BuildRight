import PropTypes from 'prop-types';
import { useState } from "react";
import FileInput from "./FileInput";
import NumberInput from "./NumberInput";
import StaticInput from "./StaticInput";
import TextInput from "./TextInput";

const PictureHeroWithTitle__edit = ({ src, textColor, height, title, alt, ...props }) => {
    const [newProperties, setNewProperties] = useState({
        title: title,
        textColor: textColor,
        src: '',
        height: height,
        alt: alt
    });

    const handlePropChange = (propName, value) => {
        setNewProperties(prev => ({ ...prev, [propName]: value }));
    }

    return (
        <form>
            <fieldset>
                <StaticInput id={`${props.id}-id`} label="ID" value={props.id } />
                <TextInput id={`${props.id}-title`} label="Title" placeholder='Title' onChange={(e) => handlePropChange('title', e.target.value)} value={newProperties.title} />
                <TextInput id={`${props.id}-textColor`} label="Text Color" placeholder='Text Color' onChange={(e) => handlePropChange('textColor', e.target.value)} value={newProperties.textColor} />
                <FileInput id={`${props.id}-src`} label="Background image" placeholder='Background image' onChange={(e) => handlePropChange('src', e.target.value)} value={newProperties.src} />
                <NumberInput id={`${props.id}-height`} label="Height" placeholder='Height' onChange={(e) => handlePropChange('height', e.target.value)} value={newProperties.height} />
                <TextInput id={`${props.id}-alt`} label="Alt" placeholder='Alt' onChange={(e) => handlePropChange('alt', e.target.value)} value={newProperties.alt} />
            </fieldset>
        </form>
    )
}

PictureHeroWithTitle__edit.propTypes = {
    src: PropTypes.string,
    textColor: PropTypes.string,
    title: PropTypes.string,
    height: PropTypes.number,
    alt: PropTypes.string
};

export default PictureHeroWithTitle__edit;
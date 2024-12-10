import PropTypes from 'prop-types';
import Hero__edit from "./Hero__edit";
import Base__edit from './Base__edit';
import { useState } from 'react';
import NumberInput from './NumberInput';
import TextInput from './TextInput';
import FileInput from './FileInput';

const PictureHero__edit = ({ src, height, alt }) => {
    const [newProperties, setNewProperties] = useState({});
    <NumberInput id={`${props.id}-max-items`} value={newProperties.maxItems} onChange={(e) => handlePropChangeInt('maxItems', e.target.value)} />

    const handlePropChange = (propName, value) => {
        setNewProperties(prev => ({ ...prev, [propName]: value }));
    }

    return (
        <Base__edit {...props }>
            <NumberInput id={`${props.id}-height`} label='Height' placeholder='Height' value={newProperties.height} onChange={(e) => handlePropChange('height', Number(e.target.value)) } />
            <TextInput id={`${props.id}-alt`} label='Alternative text' placeholder='Alternative text' value={newProperties.alt} onChange={(e) => handlePropChange('alt', e.target.value)} />
            <FileInput id={`${props.id}-src`} label='Background image' placeholder='Background image' value={newProperties.src}/>
        </Base__edit>
    )
};

PictureHero__edit.propTypes = {
    src: PropTypes.string,
    height: PropTypes.number,
    alt: PropTypes.string
}

export default PictureHero__edit;
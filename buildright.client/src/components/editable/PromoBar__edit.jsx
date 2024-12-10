import { useImperativeHandle } from "react";
import { forwardRef, useState } from "react";
import Base__edit from "./Base__edit";
import TextInput from "./TextInput";
import FileInput from "./FileInput";
import BooleanInput from "./BooleanInput";

const PromoBar__edit = forwardRef((props, ref) => {
    const [newProperties, setNewProperties] = useState({ ...props });

    useImperativeHandle(ref, () => ({
        getProperties: () => ({
            ...newProperties,
            children: childReferences.current.map((childRef) => childRef.current?.getProperties()),
        })
    }));

    function deserializeChildren(properties) {
        const y = [];
        for (const element of properties) {
            y.push(element.props ?? element);
        }

        return y;
    }

    const handlePropChange = (propName, value) => {
        setNewProperties(prev => ({ ...prev, [propName]: value }));
    }

    return (
        <Base__edit {...props}>
            <TextInput id={`${props.id}-content`} label='Text' placeholder='This text will appear in front of the image' value={newProperties.content} onChange={(e) => handlePropChange('content', e.target.value)} />
            <FileInput id={`${props.id}-image`} label='Image' placeholder='Image' />
            <BooleanInput id={`${props.id}-has-pointer-events`} label='Is clickable?' value={newProperties.hasPointerEvents} onChange={(e) => handlePropChange('hasPointerEvents', e.target.value) } />
        </Base__edit>
    )
});

export default PromoBar__edit;
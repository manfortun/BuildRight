import { useState } from 'react';
import Base__edit from './Base__edit';
import NumberInput from './NumberInput';
import './styles/servicehighlight.css';
import PropTypes from 'prop-types';
import FileInput from './FileInput';
import BooleanInput from './BooleanInput';
import Accordion from './Accordion';

const BorderContainer__edit = ((props, ref) => {
    const childReferences = useRef([]);
    const [newProperties, setNewProperties] = useState({ ...props })
    const [isChildrenExpanded, setIsChildrenExpanded] = useState(false);


    if (childReferences.current.length !== props.children?.length) {
        childReferences.current = Array(props.children?.length ?? 0)
            .fill()
            .map((_, i) => childReferences.current[i] || React.createRef());
    }

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
            <NumberInput id={`${props.id}-height`} label='Height' placeholder='Height' value={newProperties.height} onChange={(e) => handlePropChange('height', Number(e.target.value)) } />
            <FileInput id={`${props.id}-src`} label='Background image' placeholder='Background image' />
            <Accordion>
                <>
                    {childReferences.current.map((nextRef, index) => {
                        const child = deserializeChildren(newProperties.children)[index];
                        const Component = EditableComponentMap[`${child.type}__edit`];

                        return Component ? <Component ref={nextRef} {...child} onAddChildClick={props.onAddChildClick} onDeleteElementClick={props.onDeleteElementClick} /> : <div>Not implemented</div>;
                    })}
                    <AddChildButton id={props.id} title='Add child' onAddChildClick={props.onAddChildClick} />
                </>
            </Accordion>
        </Base__edit>
    )
});

export default BorderContainer__edit;
import PropTypes from 'prop-types';
import * as React from 'react';
import { useRef, useState } from 'react';
import Accordion from './Accordion';
import AddChildButton from './AddChildButton';
import Base__edit from './Base__edit';
import NumberInput from './NumberInput';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';

const Hero__edit = forwardRef((props, ref) => {
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
        <Base__edit {...props }>
            <NumberInput id={`${props-id}-height` }  label='Height' placeholder='Height' value={newProperties.height } onChange={(e) => handlePropChange('height', Number(e.target.value)) } />
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

export default Hero__edit;
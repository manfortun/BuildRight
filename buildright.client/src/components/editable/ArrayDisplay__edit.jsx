import * as React from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { forwardRef, useRef } from "react";
import Base__edit from "./Base__edit";
import NumberInput from "./NumberInput";
import { EditableComponentMap } from "../maps/componentMap";
import Accordion from "./Accordion";
import AddChildButton from "./AddChildButton";
import { useEffect } from "react";

const ArrayDisplay__edit = forwardRef((props, ref) => {
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
            <NumberInput id={`${props.id}-no-of-columns`} label='No. of columns' placeholder='No. of columns' value={newProperties.noOfColumns} onChange={(e) => handlePropChange('noOfColumns', Number(e.target.value)) } />
            <NumberInput id={`${props.id}-max-items`} label='Max no. of items to display' placeholder='Max no. of items to display' value={newProperties.maxItems} onChange={(e) => handlePropChange('maxItems', Number(e.target.value)) } />
            <NumberInput id={`${props.id}-gap`} label='Gap' placeholder='Gap' value={newProperties.gap} onChange={(e) => handlePropChange('gap', Number(e.target.value))} />
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

export default ArrayDisplay__edit;
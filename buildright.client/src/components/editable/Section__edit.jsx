import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Base__edit from './Base__edit';
import TextInput from "./TextInput";
import AdminRenderer from "../../AdminRenderer";
import { EditableComponentMap } from "../maps/componentMap";
import * as React from "react";
import Accordion from "./Accordion";
import AddChildButton from "./AddChildButton";

const Section__edit = forwardRef((props, ref) => {
    const childReferences = useRef([]);
    const [newProperties, setNewProperties] = useState({...props});

    if (childReferences.current.length !== props.children?.length) {
        childReferences.current = Array(props.children.length)
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

    const handlePropChangeString = (propName, value) => {
        setNewProperties(prev => ({ ...prev, [propName]: value }));
    }

    return (
        <Base__edit id={props.id} type={props.type }>
            <TextInput id={`${props.id}-backgroundColor`} label="Background Color" placeholder='Background Color' onChange={(e) => handlePropChangeString('backgroundColor', e.target.value)} value={newProperties.backgroundColor} />
            <Accordion>
                <>
                    {childReferences.current.map((nextRef, index) => {
                        const child = deserializeChildren(newProperties.children)[index];
                        const Component = EditableComponentMap[`${child.type}__edit`];

                        return Component ? <Component ref={nextRef} {...child} onAddChildClick={props.onAddChildClick} /> : <div>Test</div>;
                    })}
                    <AddChildButton id={props.id} onAddChildClick={props.onAddChildClick} />
                </>
            </Accordion>
        </Base__edit>
    )
});

export default Section__edit;
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Base__edit from './Base__edit';
import TextInput from "./TextInput";
import AdminRenderer from "../../AdminRenderer";
import { EditableComponentMap } from "../maps/componentMap";
import * as React from "react";

const Section__edit = forwardRef((props, ref) => {
    const [newProperties, setNewProperties] = useState({
        id: props.id,
        type: 'Section',
        backgroundColor: props.backgroundColor,
        children: props.children,
        order: props.order,
        page: props.page
    });
    const nextRefs = useRef([]);

    if (nextRefs.current.length !== newProperties.children?.length) {
        nextRefs.current = Array(newProperties.children?.length)
            .fill()
            .map((_, i) => nextRefs.current[i] || React.createRef());
    }

    useImperativeHandle(ref, () => ({
        getProperties: () => ({
            ...newProperties,
            children: nextRefs.current.map((nextRef) => nextRef.current?.getProperties()),
        })
    }));

    function deserializeChildren(properties) {
        const y = [];
        for (const element of properties) {
            if (element.props) {
                y.push(element.props);
            } else {
                y.push(element);
            }
        }

        return y;
    }

    const handlePropChangeString = (propName, value) => {
        setNewProperties(prev => ({ ...prev, [propName]: value }));
    }

    const handlePropChangeInt = (propName, value) => {
        setNewProperties(prev => ({ ...prev, [propName]: Number(value) }));
    }

    return (
        <Base__edit id={props.id}>
            <TextInput id={`${props.id}-backgroundColor`} label="Background Color" placeholder='Background Color' onChange={(e) => handlePropChangeString('backgroundColor', e.target.value)} value={newProperties.backgroundColor} />
            {nextRefs.current.map((nextRef, index) => {
                const child = deserializeChildren(newProperties.children)[index];
                const Component = EditableComponentMap[`${child.type}__edit`];

                console.log('Child Component:', Component);
                return Component ? <Component ref={nextRef} {...child} /> : <div>Test</div>;
            }) }
        </Base__edit>
    )
});

export default Section__edit;
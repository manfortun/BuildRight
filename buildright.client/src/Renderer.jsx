import React, { useEffect, useState } from "react";
import { LuPencil, LuSave, LuTrash } from 'react-icons/lu';
import { ComponentMap, EditableComponentMap } from "./components/maps/componentMap";
import './Renderer.css';
import { updateElement } from "./services/layoutService";

export const Render = (component) => {
    const { type, ...props } = component;
    let finalizedProps = { ...props };

    if (component.children?.length > 0) {
        let children = component.children.map(c => { return Render(c) });
        finalizedProps = {
            ...props,
            children: children
        }
    }

    const Component = ComponentMap[type] || null;
    return Component ? <Component {...finalizedProps} key={component.id} /> : <div>Component not found...</div>;
}

export const AdminRender = (component) => {
    const { type, ...props } = component;
    let finalizedProps = { ...props };

    if (component.children?.length > 0) {
        let children = component.children.map(c => { return AdminRender(c) });
        finalizedProps = {
            ...props,
            children: children
        }
    }

    const Component = ComponentMap[type] || null;

    if (!Component) return <div>Component not found...</div>;
    return <AdminRenderer editor={type} {...finalizedProps } />;
}


const AdminRenderer = ({ editor, ...props }) => {
    const [onEditMode, setOnEditMode] = useState(false);
    const componentRef = React.useRef();

    const test = async () => {
        if (componentRef) {
            var properties = componentRef.current.getProperties();
            await updateElement(properties);

            window.location.reload();
        }
    }

    let Component;
    if (onEditMode) {
        Component = EditableComponentMap[`${editor}__edit`] || null;
    } else {
        Component = ComponentMap[editor] || null;
    }

    return onEditMode ?
        <div className='position-relative w-100 m-3 p-3'>
            <Component {...props} ref={componentRef} />
            <div className="d-flex flex-row justify-content-end align-items-end m-2" style={{ gap: '10px' }}>
                <button className="btn bg-white" onClick={() => test()}><LuSave /></button>
            </div>
        </div> :
        <div className='position-relative w-100 section-area d-inline-grid'>
            <Component {...props} />
            <div className="d-flex flex-row justify-content-end align-items-end m-2" style={{ gap: '10px' }}>
                <button className="btn bg-white" onClick={() => setOnEditMode(true)}><LuPencil /></button>
                <button className="btn bg-white"><LuTrash /></button>
            </div>
        </div>;
}

import * as React from "react";
import { useState } from "react";
import { LuPencil, LuSave, LuTrash } from 'react-icons/lu';
import { ComponentMap, EditableComponentMap } from "./components/maps/componentMap";
import { updateElement } from "./services/layoutService";

const AdminRenderer = ({ onAddChildClick, showEditBtns = true, ...props }) => {
    let finalizedProps = { ...props };

    if (props.children?.length > 0) {
        finalizedProps.children = props.children.map(c => <AdminRenderer onAddChildClick={onAddChildClick} showEditBtns={false} {...c} />);
    }

    return <AdminRender onAddChildClick={onAddChildClick} showEditBtns={showEditBtns} {...finalizedProps } />
}

export default AdminRenderer;


const AdminRender = ({ onAddChildClick, showEditBtns, ...props }) => {
    const [onEditMode, setOnEditMode] = useState(false);
    const componentRef = React.useRef(null);

    const save = async () => {
        if (componentRef.current) {
            const properties = componentRef.current.getProperties();

            await updateElement(properties);
            setOnEditMode(false);
        }
    }

    const Component = onEditMode
        ? EditableComponentMap[`${props.type}__edit`]
        : ComponentMap[props.type];

    if (!Component) {
        return <div>Component not found...</div>;
    }

    return onEditMode ?
        <div className='position-relative w-100 m-3 p-3'>
            <Component {...props} ref={componentRef} onAddChildClick={onAddChildClick} />
            <div className="d-flex flex-row justify-content-end align-items-end m-2" style={{ gap: '10px' }}>
                <button className="btn bg-white" onClick={() => save()}><LuSave /></button>
            </div>
        </div> :
        <div className='position-relative w-100 d-inline-grid'>
            <Component {...props} />
            {showEditBtns && (
                <div className="d-flex flex-row justify-content-end align-items-end m-2" style={{ gap: '10px' }}>
                    <button className="btn bg-white" onClick={() => setOnEditMode(true)} title={props.type}><LuPencil /></button>
                    <button className="btn bg-white"><LuTrash /></button>
                </div>
            )}
        </div>;
}

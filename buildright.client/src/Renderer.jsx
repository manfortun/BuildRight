//import React, { useState } from "react";
//import { LuPencil, LuSave, LuTrash } from 'react-icons/lu';
//import './Renderer.css';
//import { ComponentMap, EditableComponentMap } from "./components/maps/componentMap";
//import { updateElement } from "./services/layoutService";

//export const AdminRender = (showEditBtns = true, ...props) => {
//    const { type, ...props } = component;
//    let finalizedProps = { ...props };

//    if (props.children?.length > 0) {
//        finalizedProps.children = props.children.map(c => AdminRender(c, false));
//    }

//    return (
//        <AdminRenderer
//            showEditBtns={showEditBtns}
//            editor={type}
//            {...finalizedProps}
//        />
//    );
//};


//const AdminRenderer = ({ showEditBtns, editor, ...props }) => {
//    const [onEditMode, setOnEditMode] = useState(false);
//    const componentRef = React.useRef(null);

//    const save = async () => {
//        if (componentRef.current) {
//            const properties = componentRef.current.getProperties();

//            await updateElement(properties);
//            setOnEditMode(false);
//        }
//    }

//    const Component = onEditMode
//        ? EditableComponentMap[`${editor}__edit`]
//        : ComponentMap[editor];

//    if (!Component) {
//        return <div>Component not found...</div>;
//    }

//    return onEditMode ?
//        <div className='position-relative w-100 m-3 p-3'>
//            <Component {...props} ref={componentRef} />
//            <div className="d-flex flex-row justify-content-end align-items-end m-2" style={{ gap: '10px' }}>
//                <button className="btn bg-white" onClick={() => save()}><LuSave /></button>
//            </div>
//        </div> :
//        <div className='position-relative w-100 section-area d-inline-grid'>
//            <Component {...props} />
//            {showEditBtns && (
//                <div className="d-flex flex-row justify-content-end align-items-end m-2" style={{ gap: '10px' }}>
//                    <button className="btn bg-white" onClick={() => setOnEditMode(true)} title={editor }><LuPencil /></button>
//                    <button className="btn bg-white"><LuTrash /></button>
//                </div>
//            ) }
//        </div>;
//}

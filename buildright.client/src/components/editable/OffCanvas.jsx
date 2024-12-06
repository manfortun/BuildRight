import { useState } from "react";

const OffCanvas = ({ children, title, isOpen, onClose }) => {
    const [offCanvasState, setOffCanvasState] = useState(isOpen);



    return (
        <div className={`offcanvas offcanvas-start ${isOpen ? 'show' : ''}`} tabIndex='-1'>
            <div className='offcanvas-header'>
                <h5 className='offcanvas-title'>{title}</h5>
                <button type='button' className='btn-close text-reset' onClick={(e) => onClose(false)} />
            </div>
            <div className='offcanvas-body'>
                {children }
            </div>
        </div>
    )
};

export default OffCanvas;
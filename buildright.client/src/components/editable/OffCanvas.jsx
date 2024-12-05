import { useState } from "react";

const OffCanvas = ({ children, isOpen, onClose }) => {
    const [offCanvasState, setOffCanvasState] = useState(isOpen);

    return (
        <div className={`offcanvas offcanvas-start ${offCanvasState ? 'show' : ''}`} tabIndex='-1'>
            <div classNamne='offcanvas-header'>
                <h5 className='offcanvas-title'>Offcanvas</h5>
                <button type='button' className='btn-close text-reset' onClick={() => setOffCanvasState(false)} />
            </div>
            <div className='offcanvas-body'>
                <div>
                    This is a test.
                </div>
            </div>
        </div>
    )
};

export default OffCanvas;
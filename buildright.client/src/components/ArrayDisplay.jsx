import { useEffect } from "react";
import './styles/arraydisplay.css';

const ArrayDisplay = ({ children, noOfColumns, maxItems, gap }) => {

    return (
        <div className="array" style={{ gridTemplateColumns: `repeat(${Math.min(children.length, noOfColumns ? noOfColumns : 3)}, 1fr)`, gap: gap != null ? `${gap}px` : '20px' }}>
            {maxItems ? maxItems : -1 < 0 ? children : children.slice(0, maxItems ? maxItems : -1) }
        </div>
    )
};

export default ArrayDisplay;
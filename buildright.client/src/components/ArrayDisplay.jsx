import { useEffect } from "react";
import './styles/arraydisplay.css';

const ArrayDisplay = ({ children, noOfColumns = 3, maxItems = -1, gap = "20px" }) => {

    return (
        <div className="array" style={{ gridTemplateColumns: `repeat(${Math.min(children.length, noOfColumns)}, 1fr)`, gap: gap }}>
            { maxItems < 0 ? children : children.slice(0, maxItems) }
        </div>
    )
};

export default ArrayDisplay;
import { useState } from "react";

const PromoBar = ({ content, clickable = false }) => {

    const [isShown, setIsShown] = useState(true);

    const onCloseClicked = () => {
        setIsShown(false);
    }

    if (!isShown) return (<></>);

    return (
        <div className="w-100 bg-danger p-1 position-relative" style={{top: '0', cursor: clickable ? 'pointer' : ''} }>
            <span className="fs-3">{content}</span>
            <button className="btn position-absolute end-0" onClick={onCloseClicked }>X</button>
        </div>
    )
};

export default PromoBar;
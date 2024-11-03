import { useState } from "react";

const PromoBar = ({ content, image, clickable = false }) => {

    const fullScreenImg = {
        width: '100vw',
        height: 'auto',
        objectFit: 'cover'
    };

    return (
        <div className="w-100 position-relative" style={{ cursor: clickable ? 'pointer' : '' }}>
            <img src="/assets/halloweensale.jpg" style={fullScreenImg} />
            {content && content.length > 0 && (
                <span className="fs-3 position-absolute" style={{ top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>{content}</span>
            ) }
        </div>
    )
};

export default PromoBar;
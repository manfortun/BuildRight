import { useEffect } from "react";

const ArrayDisplay = ({ children }) => {

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
            padding: '1rem'
        }}>
            { children }
        </div>
    )
};

export default ArrayDisplay;
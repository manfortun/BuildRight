const BorderContainer = ({ children, clickable = false }) => {
    const style = {
        border: 'gray 1px solid',
        padding: '1rem',
        borderRadius: '1rem',
        cursor: clickable ? 'pointer' : 'none',
        pointerEvents: clickable ? 'default' : 'none'
    }
    return (
        <div style={style}>
            {children}
        </div>
    )
};

export default BorderContainer;
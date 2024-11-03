import './styles/servicehighlight.css';

const BorderContainer = ({ children, clickable = false, height = "auto", backgroundSrc = "" }) => {
    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        border: '#ddd 1px solid',
        padding: '1rem',
        pointerEvents: clickable ? 'default' : 'none',
        backgroundColor: 'white',
        height: height
    }
    return (
        <div style={style} className="service-highlight">
            {backgroundSrc.length > 0 && (
                <img src={`/assets/${backgroundSrc}`} className="service-highlight-img" />
            )}
            {children}
        </div>
    )
};

export default BorderContainer;
import './styles/servicehighlight.css';
import PropTypes from 'prop-types';

const BorderContainer = ({ children, hasPointerEvents, height, backgroundSrc }) => {
    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        border: '#ddd 1px solid',
        padding: '1rem',
        pointerEvents: hasPointerEvents ? 'default' : 'none',
        backgroundColor: 'white',
        height: height ? `${height}px` : 'auto'
    }
    return (
        <div style={style} className="service-highlight">
            {backgroundSrc && backgroundSrc.length > 0 && (
                <img src={`/assets/${backgroundSrc}`} className="service-highlight-img" />
            )}
            {children}
        </div>
    )
};

BorderContainer.propTypes = {
    children: PropTypes.any,
    hasPointerEvents: PropTypes.bool,
    height: PropTypes.number,
    backgroundSrc: PropTypes.string

}

export default BorderContainer;
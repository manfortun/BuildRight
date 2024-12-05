import PropTypes from 'prop-types';

const SlantedArrayDisplay = ({ children }) => {
    const style = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: '0'
    }
    return (
        <div style={ style }>
            {children }
        </div>
    )
}

SlantedArrayDisplay.propTypes = {
    children: PropTypes.any
}

export default SlantedArrayDisplay;
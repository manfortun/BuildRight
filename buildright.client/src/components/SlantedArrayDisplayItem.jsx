import PropTypes from 'prop-types';

const SlantedArrayDisplayItem = ({ primaryText, secondaryText, src }) => {
    return (
        <div style={{ transform: 'skew(-10deg)', overflow: 'clip' }}>
            <div style={{ backgroundImage: `url('/assets/${src}')`, transform: 'skew(10deg)', height: '500px', width: '200px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {primaryText}
            </div>
        </div>
    )
}

SlantedArrayDisplayItem.propTypes = {
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    src: PropTypes.string
}

export default SlantedArrayDisplayItem;
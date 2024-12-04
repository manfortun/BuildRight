import PropTypes from 'prop-types';

const PromoBar = ({ content, src, hasPointerEvents }) => {

    const fullScreenImg = {
        width: '100vw',
        height: 'auto',
        objectFit: 'cover'
    };

    return (
        <div className="w-100 position-relative" style={{ cursor: hasPointerEvents ? 'pointer' : '' }}>
            <img src="/assets/halloweensale.jpg" style={fullScreenImg} alt="Promo"/>
            {content?.length > 0 && (
                <span className="fs-3 position-absolute" style={{ top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>{content}</span>
            ) }
        </div>
    )
};

PromoBar.propTypes = {
    content: PropTypes.string,
    src: PropTypes.string,
    hasPointerEvents: PropTypes.bool
}

export default PromoBar;
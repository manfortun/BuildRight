import PictureHero from "./PictureHero"
import PropTypes from 'prop-types';

const PictureHeroWithTitle = ({ src, textColor, height, alt }) => {
    return (
        <div style={{justifyContent: 'center', alignItems: 'center', height: '-webkit-fill-available', width: '-webkit-fill-available', display: 'flex', position: 'relative'} }>
            <PictureHero src={src} height={height} alt={alt} />
            <h1 className="position-absolute text-align-center" style={{color: textColor, fontSize: '5rem'} }>BuildRight</h1>
        </div>
    )
}

PictureHeroWithTitle.propTypes = {
    src: PropTypes.string,
    textColor: PropTypes.string,
    height: PropTypes.number,
    alt: PropTypes.string
};

export default PictureHeroWithTitle;
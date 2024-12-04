import PropTypes from 'prop-types';
import PictureHero from "./PictureHero";

const PictureHeroWithTitle = ({ src, textColor, height, title, alt }) => {
    const divStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        height: '-webkit-fill-available',
        width: '-webkit-fill-available',
        display: 'flex',
        position: 'relative'
    }
    const h1Style = {
        position: 'absolute',
        textAlign: 'center',
        color: textColor ?? 'white',
        fontSize: '5rem'
    }
    return (
        <div style={ divStyle }>
            <PictureHero src={src} height={height} alt={alt} />
            <h1 style={ h1Style }>{title}</h1>
        </div>
    )
}

PictureHeroWithTitle.propTypes = {
    src: PropTypes.string,
    textColor: PropTypes.string,
    title: PropTypes.string,
    height: PropTypes.number,
    alt: PropTypes.string
};

export default PictureHeroWithTitle;
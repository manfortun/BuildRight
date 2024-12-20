import PropTypes from 'prop-types';
import Hero from "./Hero";

const PictureHero = ({ src, height, alt }) => {
    const style = {
        backgroundImage: `url('/assets/${src}')`,
        width: '100vw',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return (
        <Hero height={height }>
            <div style={ style } />
        </Hero>
    )
};

PictureHero.propTypes = {
    src: PropTypes.string,
    height: PropTypes.number,
    alt: PropTypes.string
}

export default PictureHero;
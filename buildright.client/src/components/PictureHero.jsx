import PropTypes from 'prop-types';
import Hero from "./Hero";

const PictureHero = ({ src, height = 800, alt = "" }) => {
    return (
        <Hero alt={alt }>
            <div style={{ backgroundImage: `url('/assets/${src}')`, width: "100%", height: `${height}px`, backgroundSize: "cover", backgroundPosition: "center" }} />
        </Hero>
    )
};

PictureHero.propTypes = {
    src: PropTypes.string,
    height: PropTypes.number,
    alt: PropTypes.string
}

export default PictureHero;
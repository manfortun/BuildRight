import PropTypes from 'prop-types';
import Hero__edit from "./Hero__edit";

const PictureHero__edit = ({ src, height, alt }) => {
    const style = {
        backgroundImage: `url('/assets/${src}')`,
        width: '100vw',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return (
        <Hero__edit height={height}>
            <div style={style} />
        </Hero__edit>
    )
};

PictureHero__edit.propTypes = {
    src: PropTypes.string,
    height: PropTypes.number,
    alt: PropTypes.string
}

export default PictureHero__edit;
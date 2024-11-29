import PropTypes from 'prop-types';

const Hero = ({ children, alt }) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100">
            { children }
        </div>
    )
};

Hero.propTypes = {
    children: PropTypes.any,
    alt: PropTypes.string
}

export default Hero;
import PropTypes from 'prop-types';

const Hero = ({ children, height }) => {
    const divProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: height ? `${height}px` : '80px'
    }

    return (
        <div style={divProperties }>
            { children }
        </div>
    )
};

Hero.propTypes = {
    children: PropTypes.any,
    height: PropTypes.number
}

export default Hero;
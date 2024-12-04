import PropTypes from 'prop-types';

const Hero__edit = ({ children, height }) => {
    const divProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: height ? `${height}px` : '80px'
    }

    return (
        <div style={divProperties}>
            {children}
        </div>
    )
};

Hero__edit.propTypes = {
    children: PropTypes.any,
    height: PropTypes.number
}

export default Hero__edit;
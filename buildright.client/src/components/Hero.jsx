const Hero = ({ children, alt="" }) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100">
            { children }
        </div>
    )
};

export default Hero;
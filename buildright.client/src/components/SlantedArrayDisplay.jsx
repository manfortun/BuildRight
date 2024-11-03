const SlantedArrayDisplay = ({ children }) => {
    return (
        <div className="d-flex flex-row justify-content-center align-items-center" style={{ columnGap: '0' }}>
            {children }
        </div>
    )
}

export default SlantedArrayDisplay;
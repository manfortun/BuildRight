const Page = ({ children }) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-start" style={{ minHeight: '720px' }}>
            { children }
        </div>
    )
};

export default Page;
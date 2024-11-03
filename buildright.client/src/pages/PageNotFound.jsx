const PageNotFound = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '720px', rowGap: '1rem'} }>
            <h1 className="text-danger">
                Oops! Couldn't find this page.
            </h1>
            <a className="btn btn-primary text-white" href="/">Back to Home</a>
        </div>
    )
}

export default PageNotFound;
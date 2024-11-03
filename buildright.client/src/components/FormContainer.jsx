const FormContainer = ({ children, onSubmit, title = "" }) => {
    const formStyle = {
        padding: '1rem 1.5rem',
        border: 'solid lightgray 1px',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        minWidth: '25vw'
    }
    return (
        <form onSubmit={onSubmit} style={formStyle }>
            {title.length > 0 && (
                <h3 className="mb-4">{title}</h3>
            )}
            {children }
        </form>
    )
};

export default FormContainer;
import Section from "./Section"

const EmptySection = () => {

    const style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '50px'
    }

    return (
        <Section>
            <div className="bg-warning" style={ style }>
                <span className="text-danger fw-bold">This section has no children!</span>
            </div>
        </Section>
    )
};

export default EmptySection;
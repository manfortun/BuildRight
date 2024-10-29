import Section from "./Section"

const EmptySection = () => {
    return (
        <Section>
            <div className="d-flex flex-column align-items-center justify-content-center bg-warning w-100" style={{height: "50px"} }>
                <span className="text-danger fw-bold">This section has no children!</span>
            </div>
        </Section>
    )
};

export default EmptySection;
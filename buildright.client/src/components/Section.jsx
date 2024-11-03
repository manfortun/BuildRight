import { useEffect } from "react";
import EmptySection from "./EmptySection";

const Section = ({ children, backgroundColor = "transparent"}) => {

    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100" style={{backgroundColor: backgroundColor, padding: '100px'} }>
            {children ? children : <EmptySection /> }
        </div>
    )
};

export default Section;
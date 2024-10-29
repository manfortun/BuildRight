import { useEffect } from "react";
import EmptySection from "./EmptySection";

const Section = ({ children }) => {

    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100">
            {children ? children : <EmptySection /> }
        </div>
    )
};

export default Section;
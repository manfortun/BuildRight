import { useState } from "react";

const Accordion = ({children }) => {
    const [isChildrenExpanded, setIsChildrenExpanded] = useState(false);

    if (!children || children.length < 1) return <></>;

    return (
        <div className='accordion mt-2'>
            <div className='accordion-item'>
                <h4 className='accordion-header'>
                    <button onClick={() => setIsChildrenExpanded(!isChildrenExpanded)} className={`accordion-button  ${isChildrenExpanded ? '' : 'collapsed'}`} type='button'>
                        Children
                    </button>
                </h4>
            
                <div className={`accordion-collapse ${isChildrenExpanded ? '' : 'collapse'}`}>
                    <div className="accordion-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accordion;
import PropTypes from 'prop-types';
import EmptySection from "./EmptySection";
import { useEffect } from 'react';

const Section = ({ children, backgroundColor }) => {

    const style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        backgroundColor: backgroundColor ?? 'transparent',
        padding: '100px'
    }

    if (!children || children.length < 1) {
        return <EmptySection />;
    } else {
        return (
            <div style={style}>
                {children}
            </div>
        )
    }
};

Section.propTypes = {
    children: PropTypes.any,
    backgroundColor: PropTypes.string
}

export default Section;
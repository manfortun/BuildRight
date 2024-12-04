import PropTypes from 'prop-types';
import EmptySection from "./EmptySection";

const Section = ({ children, backgroundColor}) => {

    const style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        backgroundColor: backgroundColor ?? 'transparent',
        padding: '100px'
    }
    return (
        <div style={ style }>
            {children?.length > 0 ? children : <EmptySection /> }
        </div>
    )
};

Section.propTypes = {
    children: PropTypes.array,
    backgroundColor: PropTypes.string
}

export default Section;
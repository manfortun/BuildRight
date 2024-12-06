import PropTypes from 'prop-types';
import './styles/arraydisplay.css';

const ArrayDisplay = ({ children, noOfColumns, maxItems, gap }) => {

    const noOfItemsToDisplay = children?.length ? Math.min(children.length, maxItems || children.length) : 0;

    const style = {
        gridTemplateColumns: `repeat(${Math.min(children?.length ?? 0, noOfColumns ?? 3)}, 1fr)`,
        gap: gap != null ? `${gap}px` : '20px'
    }
    return (
        <div className="array" style={style}>
            { children?.slice(0, noOfItemsToDisplay) }
        </div>
    )
};

ArrayDisplay.propTypes = {
    children: PropTypes.any,
    noOfColumns: PropTypes.number,
    maxItems: PropTypes.number,
    gap: PropTypes.number
}
export default ArrayDisplay;
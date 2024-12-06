import PropTypes from 'prop-types';
import StaticInput from './StaticInput';

const Base__edit = ({ id, type, children, onDeleteElementClick }) => {
    return (
        <form style={{ border: '1px solid lightgray' }} className='p-2 mt-3 position-relative'>
            <button className='position-absolute end-0 top-0 btn-close p-2' title='Delete this element' onClick={(e) => onDeleteElementClick(e, id)}></button>
            <small className='text-secondary d-flex'>{type}.{id}</small>
            <fieldset>
                {children }
            </fieldset>
        </form>
    );
};

Base__edit.propTypes = {
    id: PropTypes.string,
    children: PropTypes.any
}

export default Base__edit;
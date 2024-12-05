import PropTypes from 'prop-types';
import StaticInput from './StaticInput';

export 


const Base__edit = ({ id, type, children }) => {
    return (
        <form style={{border: '1px solid lightgray'} } className='p-2 mt-3'>
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
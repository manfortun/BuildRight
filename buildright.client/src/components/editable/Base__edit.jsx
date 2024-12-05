import PropTypes from 'prop-types';
import StaticInput from './StaticInput';

export 


const Base__edit = ({ id, children }) => {
    return (
        <form style={{border: '1px solid lightgray'} } className='p-2 mt-3'>
            <fieldset>
                <StaticInput id={`${id}-id`} label="ID:" value={id} />
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
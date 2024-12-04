import PropTypes from 'prop-types';
import StaticInput from './StaticInput';

const Base__edit = ({ id, children }) => {
    return (
        <form>
            <fieldset>
                <StaticInput id={`${id}-id`} label="ID:" value={id} />
                {children }
            </fieldset>
        </form>
    );
};

Base__edit.propTypes = {
    id: PropTypes.string,
    children: PropTypes.array
}

export default Base__edit;
import PropTypes from 'prop-types';
import './editable.css';

const TextInput = ({ id, label, placeholder, value, onChange, required = false }) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-start">
            <label htmlFor={id} className={`form-label mt-3 ${required ? 'required' : ''}` }>{label}</label>
            <input type='text' className="form-control" id={id} required={required} placeholder={placeholder} value={value} onChange={onChange} data-np-intersection-state="observed" />
        </div>
    )
}

TextInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}
export default TextInput;
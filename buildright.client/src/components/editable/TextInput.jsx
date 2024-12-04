import PropTypes from 'prop-types';

const TextInput = ({ id, label, placeholder, value, onChange }) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-start">
            <label htmlFor={id} className="form-label mt-3">{label}</label>
            <input type='text' className="form-control" id={id} placeholder={placeholder} value={value} onChange={onChange} data-np-intersection-state="observed" />
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
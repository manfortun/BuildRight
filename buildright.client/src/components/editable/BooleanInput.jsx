import PropTypes from 'prop-types';

const BooleanInput = ({ id, label, placeholder, value, onChange }) => {
    return (
        <div className="d-flex gap-2">
            <input type='checkbox' className="form-check-input" id={id} placeholder={placeholder} value={value} onChange={onChange} data-np-intersection-state="observed" />
            <label htmlFor={id} className="form-check-label">{label}</label>
        </div>
    )
}

BooleanInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}
export default BooleanInput;
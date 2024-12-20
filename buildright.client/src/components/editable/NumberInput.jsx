import PropTypes from 'prop-types';

const NumberInput = ({ id, label, placeholder, value, onChange, required = false }) => {

    return (
        <div className="d-flex flex-column justify-content-center align-items-start">
            <label htmlFor={id} className={`form-label mt-3 ${required ? 'required' : ''}`}>{label}</label>
            <input type='number' className="form-control" id={id} required={required} placeholder={placeholder} value={value} onChange={onChange} data-np-intersection-state="observed" />
        </div>
    )
}

NumberInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func
}
export default NumberInput;
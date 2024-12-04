import PropTypes from 'prop-types';

const StaticInput = ({ id, label, value }) => {
    return (
        <div className="d-flex flex-row justify-content-start align-items-center gap-3">
            <label htmlFor={id} className="col-form-label">{label}</label>
            <div className='col-sm-10'>
                <input type='text' readOnly='' className="form-control-plaintext" id={id} value={value} data-np-intersection-state="observed" />
            </div>
        </div>
    )
}

StaticInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
}
export default StaticInput;
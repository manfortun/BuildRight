import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const FileInput = ({ id, label, placeholder, value, initValue, onChange }) => {
    return <small className="text-secondary d-flex my-3">File input has not been implemented yet.</small>
    const [currSrc, setCurrSrc] = useState(initValue);

    const removeCurrentSrc = (e) => {
        e.preventDefault();

        setCurrSrc('');
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-start">
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                <label htmlFor={id} className="form-label mt-3">{label}: {currSrc}</label>
                <button className="btn btn-danger" onClick={ removeCurrentSrc }>X</button>
            </div>
            <input type='file' className="form-control" id={id} placeholder={placeholder} value={value} onChange={onChange} data-np-intersection-state="observed" />
        </div>
    )
}

FileInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    initValue: PropTypes.string,
    onChange: PropTypes.func
}
export default FileInput;
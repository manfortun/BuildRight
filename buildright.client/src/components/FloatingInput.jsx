import { memo, useState } from "react";
import PropTypes from 'prop-types';

function FloatingInput({
    type,
    value,
    id,
    onChange,
    required,
    placeholder
}) {
    const [inputId] = useState(() => id || `id-${Date.now()}`);
    const labelStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
    }
    const spanStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }

    return (
        <div className="form-floating mb-3 w-100">
            <input
                type={type ?? 'text'}
                className="form-control"
                value={value ?? ""}
                id={inputId}
                onChange={onChange}
                required={required ?? false}
                placeholder={placeholder ?? ''}>
            </input>
            <label style={labelStyle } htmlFor={inputId}>
                <span style={spanStyle }>{placeholder}</span>
            </label>
        </div>
    )
}

FloatingInput.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    placeholder: PropTypes.string
}

export default memo(FloatingInput);
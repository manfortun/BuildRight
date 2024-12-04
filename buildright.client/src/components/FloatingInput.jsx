import PropTypes from 'prop-types';
import { memo, useState } from "react";

function FloatingInput({
    inputType,
    value,
    inputId,
    onChange,
    required,
    placeholder
}) {
    const [finalInputId] = useState(() => inputId || `id-${Date.now()}`);
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
                type={inputType ?? 'text'}
                className="form-control"
                value={value ?? ""}
                id={finalInputId}
                onChange={onChange}
                required={required ?? false}
                placeholder={placeholder ?? ''}>
            </input>
            <label style={labelStyle} htmlFor={finalInputId}>
                <span style={spanStyle }>{placeholder}</span>
            </label>
        </div>
    )
}

FloatingInput.propTypes = {
    inputType: PropTypes.string,
    value: PropTypes.string,
    inputId: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    placeholder: PropTypes.string
}

export default memo(FloatingInput);
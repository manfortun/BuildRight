import { memo, useState } from "react";

function FloatingInput({
    type = "text",
    value = "",
    id,
    onChange,
    required = false,
    placeholder = ""
}) {
    const [inputId] = useState(() => id || `id-${Date.now()}`);

    return (
        <div className="form-floating mb-3 w-100">
            <input
                type={type}
                className="form-control"
                value={value === undefined || value === null ? "" : value}
                id={inputId}
                onChange={onChange}
                required={required}
                placeholder={placeholder}>
            </input>
            <label
                className="d-flex flex-row justify-content-center align-items-center m-auto"
                htmlFor={inputId}>
                <span className="d-flex flex-row align-items-center">{placeholder}</span>
            </label>
        </div>
    )
}

export default memo(FloatingInput);
import React from 'react';

function ZrInput(props) {
    return (
        <div className={(props.className ? props.className : "") + " zr-input " + (props.isInvalid ? "invalid" : "")}>
            <label className={props.disabled ? "disabled" : ""}>
                {props.label}
            </label>
            <input type="text" value={props.value} onChange={props.onChange} onBlur={props.onBlur}
                   placeholder={props.placeholder}
                   readOnly={props.onChange === undefined} disabled={props.disabled}/>
            <div className="patient-input-error-message">{props.errorMessage}</div>
        </div>
    );
}

export default ZrInput;

import React from 'react';

function ZrInput(props) {
    return (
        <div className={"zr-input " + (props.isInvalid ? "invalid" : "")}>
            <label>
                {props.label}
            </label>
            <input type="text" value={props.value} onChange={props.onChange} onBlur={props.onBlur}
                   readOnly={props.onChange === undefined}/>
            <div className="patient-input-error-message">{props.errorMessage}</div>
        </div>
    );
}

export default ZrInput;

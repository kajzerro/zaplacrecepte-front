import React from 'react';

function ZrTextArea(props) {

    function onSelectAction(e) {
        if (props.noSelectionOnFocus && e.target.value === "+48") {
            e.target.selectionStart = e.target.value.length;
            e.target.selectionEnd = e.target.value.length;
        }
    }

    return (
        <div
            className={(props.className ? props.className : "") + " zr-textarea " + (props.isInvalid ? "invalid" : "")}>
            <label className={props.disabled ? "disabled" : ""}>
                {props.label}
            </label>
            <textarea type="text" value={props.value} onChange={props.onChange} onBlur={props.onBlur}
                      onSelect={onSelectAction}
                      placeholder={props.placeholder}
                      readOnly={props.onChange === undefined} disabled={props.disabled}
                      autoFocus={props.autoFocus && props.value === ''}/>
            <div className="patient-input-error-message">{props.errorMessage}</div>
        </div>
    );
}

export default ZrTextArea;

import React, {useState} from 'react';

function ZrCheckbox(props) {

    const [value, setValue] = useState(props.initValue || false);

    return (
        <label className="zr-checkbox">{props.label}
            <input type="checkbox" checked={value}
                   onChange={e => {
                       setValue(e.target.checked);
                       props.onChange(e.target.checked)
                   }}/>
            <span className="checkmark"></span>
        </label>
    );
}

export default ZrCheckbox;

import React from 'react';

function ZrStatusButton(props) {

    switch (props.value) {
        case 'WAITING_FOR_CONFIRMATION':
            return <button disabled type="button"
                           className="btn btn-block status-button green">Zapłacono</button>;
        case 'NEW':
        case 'PENDING':
            return <button disabled type="button"
                           className="btn btn-block status-button ">Niezapłacona</button>;
        case 'COMPLETED':
            return <button disabled type="button"
                           className="btn btn-block status-button blue">Zrealizowana</button>;
        case 'CANCELED':
            return <button disabled type="button"
                           className="btn btn-block status-button red">Anulowana</button>;
        default:
            return null;
    }
    ;
}

export default ZrStatusButton;

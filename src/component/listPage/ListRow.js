import React from 'react';

function createButton(status) {
    switch (status) {
        case 'WAITING_FOR_CONFIRMATION':
            return <button disabled type="button"
                           className="btn btn-outline-success btn-block status-button blue">Zapłacono</button>;
        case 'NEW':
        case 'PENDING':
            return <button disabled type="button"
                           className="btn btn-outline-secondary btn-block status-button ">Niezapłacona</button>;
        case 'COMPLETED':
            return <button disabled type="button"
                           className="btn btn-outline-primary btn-block status-button green">Zrealizowana</button>;
        case 'CANCELED':
            return <button disabled type="button"
                           className="btn btn-outline-danger btn-block status-button red">Anulowana</button>;
        default:
            return null;
    }
}

function ListRow(props) {

    return (
        <div className="row patient-row-wrapper mt-4" onClick={props.onClick}>
            <div className="col-2">
                <span>
                {props.prescription.createDateTime.format("YYYY-MM-DD")}
                </span>
            </div>
            <div className="col-3">
                <span>
                {props.prescription.firstName} {props.prescription.lastName}
                </span>
            </div>
            <div className="col-2">
                <span>{props.prescription.pesel}</span>
            </div>
            <div className="col-2">
                <span>{props.prescription.postalCode}</span>
            </div>
            <div className="col-3">
                {createButton(props.prescription.status)}
            </div>
        </div>
    );
}

export default ListRow;

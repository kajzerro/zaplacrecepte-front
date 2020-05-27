import React from 'react';

function createButton(status) {
    switch (status) {
        case 'WAITING_FOR_CONFIRMATION':
            return <button disabled type="button" className="btn btn-outline-success btn-block patient-button">Zapłacona</button>;
        case 'NEW':
        case 'PENDING':
            return <button disabled type="button" className="btn btn-outline-secondary btn-block patient-button">Niezapłacona</button>;
        case 'COMPLETED':
            return <button disabled type="button" className="btn btn-outline-primary btn-block patient-button">Zrealizowana</button>;
        case 'CANCELED':
            return <button disabled type="button" className="btn btn-outline-danger btn-block patient-button">Anulowana</button>;
        default:
            return null;
    }
}

function ListRow(props) {

    return (
        <div className="row">
            <div className="patient-row-wrapper">
                <div className={"patient-row row " + props.className} onClick={props.onClick}>
                    <div className="col-3">
                        <h2>
                            {props.prescription.createDateTime.format("YYYY-MM-DD") }
                        </h2>
                    </div>
                    <div className="col-6">
                        <h2>
                            {props.prescription.firstName} {props.prescription.lastName}
                        </h2>
                    </div>
                    <div className="col-3">
                        {createButton(props.prescription.status)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListRow;

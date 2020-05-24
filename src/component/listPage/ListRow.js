import React from 'react';

function createButton(status) {
    switch (status) {
        case 'paid':
            return <button type="button" className="btn btn-success btn-block patient-button">Zapłacona</button>;
        case 'unpaid':
            return <button type="button" className="btn btn-warning btn-block patient-button">Niezapłacona</button>;
        case 'done':
            return <button type="button" className="btn btn-primary btn-block patient-button">Zrealizowana</button>;
        default:
            return null;
    }
}

function ListRow(props) {

    return (
        <div className="row">
            <div className="offset-1 col-10">
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

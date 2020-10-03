import React from 'react';
import ZrStatusButton from '../common/ZrStatusButton';

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
                <ZrStatusButton value={props.prescription.status}/>
            </div>
        </div>
    );
}

export default ListRow;

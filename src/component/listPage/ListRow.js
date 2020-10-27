import React from 'react';
import ZrStatusButton from '../common/ZrStatusButton';
import {isPrescriptionClientType, isServiceClientType} from "../config/Config";

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
                <span>
                    {isPrescriptionClientType() && props.prescription.postalCode}
                    {isServiceClientType() && props.prescription.price + " PLN"}
                </span>
            </div>
            <div className="col-3">
                <ZrStatusButton value={props.prescription.status}/>
            </div>
            {isServiceClientType() && props.prescription.prescriptionNumber ?
                <div className="col-12 prescription-sent-info">
                    <hr/>
                    Wysłano kod recepty: {props.prescription.prescriptionNumber}
                </div> : null}
        </div>
    );
}

export default ListRow;

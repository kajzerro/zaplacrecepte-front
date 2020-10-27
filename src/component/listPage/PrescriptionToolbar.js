import React from 'react';

function PrescriptionToolbar(props) {

    return <div className="row mb-5">
        <div className="col-5 mt-2">
            <h2 className="zr-header">
                Recepty
            </h2>
            <div className="zr-header-description">
                Sprawdź status oraz szczegóły wystawionych recept
            </div>
        </div>
        <div className="col-7">
            <div className="container-fluid functional-top">
                <div className="row">
                    <div className="offset-7 col-5">
                        <button type="button"
                                className="btn btn-block zr-red-button"
                                onClick={props.action}>+&nbsp;&nbsp;Wystaw recepte
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default PrescriptionToolbar;

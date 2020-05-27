import React, {useEffect, useState} from 'react';


function ListRow(props) {
    const [formStatus, setFormStatus] = useState(props.initData || "");
    const [unwrapped, setUnwrapped] = useState(false);
    const onChange = props.onChange;
    useEffect(() => {
        onChange(formStatus);
    }, [formStatus, onChange]);

    return (
        <div>
            <button
                className={"btn btn-block btn-outline-secondary mb-3"}
                onClick={() => {
                    setUnwrapped(!unwrapped);
                }}>Ręczna zmiana statusu
            </button>
            {
                unwrapped &&
                <div className="mb-3 container patient-no-paddings">
                    <div className="row">
                        <div className="col-3">
                            <button
                                className={"btn btn-block " + (formStatus === "CANCELED" ? "btn-primary" : "btn-outline-secondary")}
                                onClick={() => {
                                    setFormStatus("CANCELED")
                                }}>Anulowana
                            </button>
                        </div>
                        <div className="col-3">
                            <button
                                className={"btn btn-block " + ((formStatus === "PENDING" || formStatus === "NEW") ? "btn-primary" : "btn-outline-secondary")}
                                onClick={() => {
                                    setFormStatus("PENDING")
                                }}>Niezapłacona
                            </button>
                        </div>
                        <div className="col-3">
                            <button
                                className={"btn btn-block " + (formStatus === "WAITING_FOR_CONFIRMATION" ? "btn-outline-primary" : "btn-outline-secondary")}
                                onClick={() => {
                                    setFormStatus("WAITING_FOR_CONFIRMATION")
                                }}>Zapłacona
                            </button>
                        </div>
                        <div className="col-3">
                            <button
                                className={"btn btn-block " + (formStatus === "COMPLETED" ? "btn-primary" : "btn-outline-secondary")}
                                onClick={() => {
                                    setFormStatus("COMPLETED")
                                }}>Zrealizowana
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ListRow;

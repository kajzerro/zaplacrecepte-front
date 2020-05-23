import React, {useEffect, useState} from 'react';


function ListRow(props) {
    const [formStatus, setFormStatus] = useState(props.initData || "");
    const onChange = props.onChange;
    useEffect(() => {
        onChange(formStatus);
    }, [formStatus, onChange]);

    return (
        <div>
            <div className="mb-3 text-center patient-status-info">Status płatności:</div>
            <div className="mb-3 container patient-no-paddings">
                <div className="row">
                    <div className="col-4">
                        <button
                            className={"btn btn-block " + (formStatus === "unpaid" ? "btn-primary" : "btn-outline-secondary")}
                            onClick={() => {
                                setFormStatus("unpaid")
                            }}>Niezapłacona
                        </button>
                    </div>
                    <div className="col-4">
                        <button
                            className={"btn btn-block " + (formStatus === "paid" ? "btn-primary" : "btn-outline-secondary")}
                            onClick={() => {
                                setFormStatus("paid")
                            }}>Zapłacona
                        </button>
                    </div>
                    <div className="col-4">
                        <button
                            className={"btn btn-block " + (formStatus === "done" ? "btn-primary" : "btn-outline-secondary")}
                            onClick={() => {
                                setFormStatus("done")
                            }}>Zrealizowana
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListRow;

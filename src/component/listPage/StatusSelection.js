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
                className={"btn btn-block zr-red-outline-button mb-3"}
                onClick={() => {
                    setUnwrapped(!unwrapped);
                }}>Zmień status ręcznie
            </button>
            {
                unwrapped &&
                <div className="mb-3 container zr-status-change-unwrapped">
                    <div className="row">
                        <div className="col-3">
                            <div className={"status blue"}
                                 onClick={() => {
                                     setFormStatus("COMPLETED");
                                     setUnwrapped(false);
                                 }}>
                                <span/>
                                <label>
                                    Zrealizowana
                                </label>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className={"status green"}
                                 onClick={() => {
                                     setFormStatus("WAITING_FOR_CONFIRMATION");
                                     setUnwrapped(false);
                                 }}>
                                <span/>
                                <label>
                                    Zapłacona
                                </label>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className={"status"}
                                 onClick={() => {
                                     setFormStatus("PENDING");
                                     setUnwrapped(false);
                                 }}><span/>
                                <label>
                                    Niezapłacona
                                </label>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className={"status red"}
                                 onClick={() => {
                                     setFormStatus("CANCELED");
                                     setUnwrapped(false);
                                 }}><span/>
                                <label>
                                    Anulowana
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ListRow;

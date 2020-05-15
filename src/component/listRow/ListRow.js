import React from 'react';

function createButton(status) {
    switch (status) {
        case 'paid': return <button type="button" className="btn btn-success btn-block">Zapłacona</button>;
        case 'unpaid': return <button type="button" className="btn btn-warning btn-block">Niezapłacona</button>;
        case 'done': return <button type="button" className="btn btn-primary btn-block">Zrealizowana</button>;
        default: return null;
    }

}

function ListRow(props) {

    return (
        <div className="patient-row row">
            <div className="col-6">
                <h2>
                {props.name}
                </h2>
            </div>
            <div className="offset-3 col-3">
                    {createButton(props.status)}
            </div>
        </div>
    );
}

export default ListRow;

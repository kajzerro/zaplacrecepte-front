import React from 'react';
import ListRow from '../listRow/ListRow';

function ListPage() {

    var data = [
        {name: 'Piotr', status: 'paid'},
        {name: 'Piotr', status: 'unpaid'},
        {name: 'Piotr', status: 'done'},
    ]

    return (
        <div className="patient-list container">
            {data.map(row => (
                <ListRow name={row.name} status={row.status}></ListRow>
            ))}
        </div>
    );
}

export default ListPage;

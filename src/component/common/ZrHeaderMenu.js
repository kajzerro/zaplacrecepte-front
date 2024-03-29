import React from 'react';
import {useHistory} from "react-router-dom";

function ZrHeaderMenu(props) {
    let history = useHistory();

    return (
        <div className="row">
            <div className="col-12">
                <div className="row zr-header-menu">
                    <div className="col-4">
                        <img onClick={() => history.push('/')} src="logo.svg"/>
                    </div>
                    <div className="col-8">
                        <ul>
                            <li onClick={() => history.push('/wspolpraca')}>Współpraca</li>
                            <li onClick={() => history.push('/kontakt')}>Kontakt</li>
                            <li onClick={() => history.push('/regulamin')}>Regulamin</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ZrHeaderMenu;

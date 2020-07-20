import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import './LoginPage.css';
import axios from 'axios';
import {getEndpoint} from '../config/Config';

function LoginPage() {

    function login() {
        axios.get(getEndpoint() + "/api/login",
            {
                auth: {
                    username: formLogin,
                    password: formPassword
                }
            })
            .then(() => {
                history.push('/lista');
            })
            .catch(err => alert(err));
    }

    const [formLogin, setFormLogin] = useState("");
    const [formPassword, setFormPassword] = useState("");

    let history = useHistory();
    return (
        <div className="login-page">
            <div className="wrapper">
                <div id="formContent">
                    <div className="icon"><img src="/logo.png" alt="Smiley face" height="80" width="80"/></div>
                    <form>
                        <input type="text" id="login" className="second" name="login"
                               placeholder="Nazwa gabinetu" onChange={e => setFormLogin(e.target.value)}/>
                        <input type="password" id="password" className="third" name="login"
                               placeholder="Hasło" onChange={e => setFormPassword(e.target.value)}/>
                        <input type="button" className="fourth" value="Zaloguj się"
                               onClick={() => login()}/>
                    </form>
                </div>
            </div>
            <div className="login-footer">
                <hr/>
                <ul>
                    <li onClick={() => history.push('/regulamin')}>Regulamin</li>
                    <li onClick={() => history.push('/wspolpraca')}>Współpraca</li>
                    <li onClick={() => history.push('/kontakt')}>Kontakt</li>
                </ul>
            </div>
        </div>
    );
}

export default LoginPage;

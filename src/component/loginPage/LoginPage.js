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
            <div className="login-header">
                <img src="loginPage/logo.png"/>
                <ul>
                    <li onClick={() => history.push('/wspolpraca')}>Współpraca</li>
                    <li onClick={() => history.push('/kontakt')}>Kontakt</li>
                    <li onClick={() => history.push('/regulamin')}>Regulamin</li>
                </ul>
            </div>
            <div className="left-site">
                <div className="body-wrapper">
                    <div className="hello-header">Witaj w ZaplacRecepte.pl</div>
                    <div className="input-frame">
                        <div className="hello-description">Aby w pełni móc korzystać z systemu, zaloguj się używając
                            swojego
                            emaila oraz hasła
                        </div>
                        <form>
                            <label htmlFor="login">Login/Email</label>
                            <input type="text" id="login" name="login"
                                   placeholder="Nazwa gabinetu" onChange={e => setFormLogin(e.target.value)}/>
                            <label htmlFor="password">Hasło</label>
                            <input type="password" id="password" name="login"
                                   placeholder="Hasło" onChange={e => setFormPassword(e.target.value)}/>
                            <div className="after-input">
                                <span className="error-label">*Podałeś nieprawidłowy email lub hasło</span>
                                <span className="forgot-label">Zapomniałeś hasła?</span>
                                <div className="remember-me">
                                    <img src="loginPage/checkboxOn.png"/>
                                    Zapamiętaj mnie
                                </div>
                            </div>
                                   <input type="button" value="Zaloguj się"
                                   onClick={() => login()}/>
                        </form>
                    </div>
                </div>
                <div className="login-footer">All rights reserved © copyright www.zaplacrecepte.pl 2020</div>
            </div>
            <div className="right-site">
                <img src="loginPage/loginImage.png"/>
            </div>
        </div>
    );
}

export default LoginPage;

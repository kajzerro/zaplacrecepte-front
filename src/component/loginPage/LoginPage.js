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
        <div className="login-page container-fluid">
            <div className="row">
                <div className="col-6 left-side">
                    <div className="row login-header">
                        <div className="col-4">
                            <img src="loginPage/logo.png"/>
                        </div>
                        <div className="col-8">
                            <ul>
                                <li onClick={() => history.push('/wspolpraca')}>Współpraca</li>
                                <li onClick={() => history.push('/kontakt')}>Kontakt</li>
                                <li onClick={() => history.push('/regulamin')}>Regulamin</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row body-wrapper">
                        <div className="offset-1 col-11 offset-xl-3 col-xl-9">
                            <div className="hello-header">Witaj w ZaplacRecepte.pl</div>
                            <div className="input-frame">
                                <div className="hello-description">Aby w pełni móc korzystać z systemu, zaloguj się
                                    używając
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
                    </div>
                </div>
                <div className="col-6 right-side">
                    <img src="loginPage/loginImage.png"/>
                </div>
            </div>
            <div className="right-side-bottom">
                <div className="inside"/>
            </div>
            <div className="login-footer">
                All rights reserved © copyright www.zaplacrecepte.pl 2020
            </div>
        </div>
    );
}

export default LoginPage;

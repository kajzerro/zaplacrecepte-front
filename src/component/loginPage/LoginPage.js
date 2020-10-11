import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import './LoginPage.css';
import axios from 'axios';
import {getEndpoint} from '../config/Config';
import ZrFooter from '../common/ZrFooter';

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
            .catch(err => {
                setWrongUserOrPassword(true);
                console.error(err)
            });
    }

    const [scalingStyle, setScalingStyle] = useState({});

    const [formLogin, setFormLogin] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [wrongUserOrPassword, setWrongUserOrPassword] = useState(false);

    let history = useHistory();
    return (
        <div>
            <div className="login-page">
                <div className="container-fluid">
                    <div className="row fullscreen">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row login-header">
                                        <div className="col-4">
                                            <img src="logo.svg"/>
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
                            <div className="row body-wrapper">
                                <div className="col-12 offset-xl-1 col-xl-11">
                                    <h1 className="zr-header">Witaj w ZaplacRecepte.pl</h1>
                                    <div className="input-frame">
                                        <div className="zr-header-description">Zaloguj się podając e-mail i hasło, aby w
                                            pełni korzystać z aplikacji.
                                        </div>
                                        <form className={wrongUserOrPassword ? "wrong-user-or-password" : ""}>
                                            <label htmlFor="login">Email</label>
                                            <input type="text" id="login" name="login"
                                                   placeholder="Nazwa gabinetu"
                                                   onChange={e => {
                                                       setWrongUserOrPassword(false);
                                                       setFormLogin(e.target.value);
                                                   }}/>
                                            <label htmlFor="password">Hasło</label>
                                            <input type="password" id="password" name="login"
                                                   placeholder="Hasło" onChange={e => {
                                                setWrongUserOrPassword(false);
                                                setFormPassword(e.target.value);
                                            }}/>
                                            <div className="after-input">
                                                {wrongUserOrPassword && <span className="error-label">*Podałeś nieprawidłowy email lub hasło</span>}
                                                <span className="forgot-label">Zapomniałeś hasła?</span>
                                                <div className="remember-me">
                                                    <img src="loginPage/checkboxOn.png"/>
                                                    Zapamiętaj mnie
                                                </div>
                                            </div>
                                            <input className="zr-red-button" type="button" value="Zaloguj się"
                                                   onClick={() => login()}/>
                                            <input className="register-button" type="button" value="Zarejestruj się"
                                                   onClick={() => login()}/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 right-side">
                            <div className="background"/>
                            <img src="loginPage/loginImage.png"/>
                        </div>
                        <ZrFooter/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

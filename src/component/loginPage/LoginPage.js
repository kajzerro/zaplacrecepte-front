import React from 'react';
import {useHistory} from "react-router-dom";
import './LoginPage.css';

function LoginPage() {
    let history = useHistory();
    return (
        <div className="login-page">
            <div className="wrapper">
                <div id="formContent">
                    <div className="icon"><img src="/logo.png" alt="Smiley face" height="80" width="80"/></div>
                    <form>
                        <input type="text" id="login" className="second" name="login"
                               placeholder="Nazwa gabinetu"/>
                        <input type="text" id="password" className="third" name="login"
                               placeholder="Hasło"/>
                        <input type="button" className="fourth" value="Zaloguj się"
                               onClick={() => history.push('/lista')}/>
                    </form>
                    <div id="formFooter">
                        <a className="underlineHover" href="#">Zapomniałaś/zapomniałeś hasła?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

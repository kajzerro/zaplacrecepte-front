import React from 'react';
import './LoginPage.css';

function LoginPage() {
    return (
        <div className="wrapper">

        <div id="formContent">
        <div className="icon"> <img src="/logo.png" alt="Smiley face" height="80" width="80"/> </div>
        <form>
                    <input type="text" id="login" className="second" name="login" placeholder="Nazwa gabinetu"></input>
                    <input type="text" id="password" className="third" name="login"
                           placeholder="Hasło"></input>
                    <a href='./lista'> <input type="button" className="fourth" value="Zaloguj się"></input></a>
                </form>
                <div id="formFooter">
                    <a className="underlineHover" href="#">Zapomniałaś/zapomniałeś hasła?</a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

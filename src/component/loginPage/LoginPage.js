import React from 'react';
import './LoginPage.css';

function LoginPage() {
    return (
        <div className="wrapper">
            <div id="formContent">
                <form>
                    <input type="text" id="login" className="second" name="login" placeholder="login"></input>
                    <input type="text" id="password" className="third" name="login"
                           placeholder="password"></input>
                    <a href='./lista'> <input type="button" className="fourth" value="Log In"></input></a>
                </form>
                <div id="formFooter">
                    <a className="underlineHover" href="#">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

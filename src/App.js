import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LoginPage from './component/loginPage/LoginPage';
import ListPage from "./component/listPage/ListPage";
import ThankYouPage from "./component/thankYouPage/ThankYouPage";
import "./App.css";


function App() {
    return (
        <main>
            <Switch>
                <Route name="loginPage" path="/" component={LoginPage} exact/>
                <Route path="/lista" component={ListPage}/>
                <Route path="/thankyou" component={ThankYouPage}/>
                <Redirect from="/" to="/" />
            </Switch>
        </main>
    );
}

export default App;

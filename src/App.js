import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import LoginPage from './component/loginPage/LoginPage';
import ListPage from "./component/listPage/ListPage";
import "./App.css";


function App() {
    return (
        <main>
            <Switch>
                <Route name="loginPage" path="/" component={LoginPage} exact/>
                <Route path="/lista" component={ListPage}/>
                <Redirect from="/" to="/" />
            </Switch>
        </main>
    );
}

export default App;

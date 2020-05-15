import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginPage from './component/loginPage/LoginPage';
import ListPage from "./component/listPage/ListPage";
import "./App.css";


function App() {
    return (
        <main>
            <Switch>
                <Route path="/" component={LoginPage} exact/>
                <Route path="/lista" component={ListPage}/>
            </Switch>
        </main>
    );
}

export default App;

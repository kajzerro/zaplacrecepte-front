import React from 'react';
import "./App.css";
import {Redirect, Route, Switch} from 'react-router-dom';
import LoginPage from './component/loginPage/LoginPage';
import ListPage from "./component/listPage/ListPage";
import ThankYouPrescriptionPage from "./component/thankYouPage/ThankYouPrescriptionPage";
import ThankYouServicePage from "./component/thankYouPage/ThankYouServicePage";
import ThankYouRouterPage from "./component/thankYouPage/ThankYouRouterPage";
import PaymentPrescriptionPage from "./component/paymentPage/PaymentPrescriptionPage";
import PaymentServicePage from "./component/paymentPage/PaymentServicePage";
import StatuePage from "./component/statuePage/StatuePage";
import CooperationPage from "./component/cooperationPage/CooperationPage";
import ContactPage from "./component/contactPage/ContactPage";

function App() {
    return (
        <main>
            <Switch>
                <Route name="loginPage" path="/" component={LoginPage} exact/>
                <Route path="/lista" component={ListPage}/>
                <Route path="/prescription/thankyou" component={ThankYouPrescriptionPage}/>
                <Route path="/service/thankyou" component={ThankYouServicePage}/>
                <Route path="/thankyou" component={ThankYouRouterPage}/>
                <Route path="/p/:prescriptionId" component={PaymentPrescriptionPage}/>
                <Route path="/s/:prescriptionId" component={PaymentServicePage}/>
                <Route path="/regulamin" component={StatuePage}/>
                <Route path="/wspolpraca" component={CooperationPage}/>
                <Route path="/kontakt" component={ContactPage}/>
                <Redirect from="/" to="/" />
            </Switch>
        </main>
    );
}

export default App;

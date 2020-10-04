import React from 'react';
import Footer from "../common/Footer";

function ThankYouPage() {

    return (
        <div className="thankyou-page">
            <div className="fullscreen">
                <div className="body-wrapper">
                    <img className={"logo mb-4"} src="/logo.svg"/>
                    <h3 className="zr-header">
                        Recepta została przekazana do realizacji
                    </h3>
                    <div className={"zr-header-description"}>
                        Informacja o realizacji recepty oraz kod recepty zostaną przesłane
                        na podany adres email oraz SMSem na udostępniony numer telefonu.

                    </div>
                </div>
                <img src="/thankyouPage/bottomImage.svg" className={"bottom-image"}/>
                <Footer/>
            </div>
        </div>
    );
}

export default ThankYouPage;

import React from 'react';
import ZrFooter from "../common/ZrFooter";

function ThankYouServicePage() {

    return (
        <div className="thankyou-page">
            <div className="fullscreen">
                <div className="body-wrapper">
                    <img className={"logo mb-4"} src="/logo.svg"/>
                    <h3 className="zr-header">
                        Płatność została przekazana na konto gabinetu
                    </h3>
                    <div className={"zr-header-description"}>
                     Dziękujemy!
                    </div>
                </div>
                <img src="/thankyouPage/bottomImage.svg" className={"bottom-image"}/>
                <ZrFooter/>
            </div>
        </div>
    );
}

export default ThankYouServicePage;

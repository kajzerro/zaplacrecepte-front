import React from 'react';
import ThankYouPrescriptionPage from "./ThankYouPrescriptionPage";
import ThankYouServicePage from "./ThankYouServicePage";

function ThankYouRouterPage(props) {

    function isPrescriptionEntity() {
        return props.location && props.location.search && new URLSearchParams(props.location.search).get('OrderID') && new URLSearchParams(props.location.search).get('OrderID')[0] === 'P';
    }

    return (
        isPrescriptionEntity() ?
            <ThankYouPrescriptionPage/> :
            <ThankYouServicePage/>
    );
}

export default ThankYouRouterPage;

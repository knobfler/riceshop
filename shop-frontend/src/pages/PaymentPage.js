import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import PaymentContainer from 'containers/payment/PaymentContainer';


const PaymentPage = (props) => {
    return (
        <PageTemplate>
            <PaymentContainer/>
        </PageTemplate>
    );
};

export default PaymentPage;
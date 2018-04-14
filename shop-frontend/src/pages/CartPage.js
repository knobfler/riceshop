import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import CartContainer from 'containers/cart/CartContainer';
const CartPage = (props) => {
    return (
        <PageTemplate>
            <CartContainer/>
        </PageTemplate>
    );
};

export default CartPage;
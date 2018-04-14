import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import LoginContainer from 'containers/login/LoginContainer';

const LoginPage = (props) => {
    return (
        <PageTemplate>
            <LoginContainer/>
        </PageTemplate>
    );
};

export default LoginPage;
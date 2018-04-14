import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as baseActions from 'store/modules/base';
import LoginForm from 'components/login/LoginForm';
import { withRouter } from 'react-router-dom';

class LoginContainer extends Component {


    handleChangeInput = ({name, value}) => {
        const { BaseActions } = this.props;
        BaseActions.changeInput({name, value});
    }

    handleLogin = async () => {
        const { BaseActions, userID, userPassword, history } = this.props;

        try {
            await BaseActions.memberLogin({userID, userPassword});
            localStorage.memberLogged = "true";
            localStorage.loggedMember = userID;
            history.push('/');
        } catch(e) {
            console.log(e);
        }
    }

    handleResetErrors = () => {
        const { BaseActions } = this.props;
        BaseActions.resetErrors();
    }
 render() {
     const { handleChangeInput, handleLogin, handleResetErrors } = this;
     const { userID, userPassword, errorLog, errorCode } = this.props;
   return (
    <LoginForm
        userID={userID}
        userPassword={userPassword}
        onChangeInput={handleChangeInput}
        onLogin={handleLogin}
        errorCode={errorCode}
        errorLog={errorLog}
        onResetErrors={handleResetErrors}/>
   );
 }
}

export default connect(
  (state) => ({
      memberLogged: state.base.get('memberLogged'),
      userID: state.base.get('userID'),
      userPassword: state.base.get('userPassword'),
      errorCode: state.base.getIn(['error', 'errorCode']),
      errorLog: state.base.getIn(['error', 'errorLog'])
  }),
  (dispatch) => ({
      BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(LoginContainer));
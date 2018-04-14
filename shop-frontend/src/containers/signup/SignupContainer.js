import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as signupActions from 'store/modules/signup';
import SignupForm from 'components/signup/SignupForm';
import { withRouter } from 'react-router-dom';

class SignupContainer extends Component {

    initialize = () => {
        const { SignupActions } = this.props;
        SignupActions.initialize();
    }

    componentDidMount() {
        this.initialize();
    }

    handleChangeInput = ({name, value}) => {
        const { SignupActions } = this.props;
        SignupActions.changeInput({name, value});
    }

    handleChangeAddress = ({name, value}) => {
        const { SignupActions } = this.props;
        SignupActions.insertDaumAddress({name, value});
    }

    handleCheckId = async () => {
        const { SignupActions, userID } = this.props;
        try {
            await SignupActions.checkid({userID});

        } catch(e) {
            console.log(e);
        }
    }

    handleResetErrors = () => {
        const { SignupActions } = this.props;
        SignupActions.resetErrors();
    }

    handleResetMessage = () => {
        const { SignupActions } = this.props;
        SignupActions.resetMessage();
    }

    handleSignup = async () => {
        const { SignupActions, history} = this.props;
        const { userID, userName, userEmail, userPassword, userPasswordCheck, userPostAddress, userPostCode, userDetailAddress } = this.props;

        try {
            await SignupActions.signup({
                userID,
                userName,
                userEmail,
                userPassword,
                userPasswordCheck,
                userPostAddress,
                userPostCode,
                userDetailAddress
            });
            
            history.push('/login');
        } catch(e){
            console.log(e);
        }
    }   
 render() {
     const { handleChangeInput, handleChangeAddress, handleSignup, handleCheckId, handleResetErrors, handleResetMessage } = this;
     const { userID, userName, userEmail, userPassword, userPasswordCheck, userPostAddress, userPostCode, userDetailAddress, errorCode, errorLog, checkIdSuccessMessage } = this.props;
   return (
    <SignupForm
        onResetMessage={handleResetMessage}
        checkIdSuccessMessage={checkIdSuccessMessage}
        onResetErrors={handleResetErrors}
        errorCode={errorCode}
        errorLog={errorLog}
        onSignup={handleSignup}
        onCheckId={handleCheckId}
        onChangeAddress={handleChangeAddress}
        onChangeInput={handleChangeInput}
        userID={userID}
        userName={userName}
        userEmail={userEmail}
        userPassword={userPassword}
        userPasswordCheck={userPasswordCheck}
        userPostAddress={userPostAddress}
        userPostCode={userPostCode}
        userDetailAddress={userDetailAddress}
        />
   );
 }
}

export default connect(
  (state) => ({
      userID: state.signup.get('userID'),
      userName: state.signup.get('userName'),
      userEmail: state.signup.get('userEmail'),
      userPassword: state.signup.get('userPassword'),
      userPasswordCheck: state.signup.get('userPasswordCheck'),
      userPostAddress: state.signup.get('userPostAddress'),
      userPostCode: state.signup.get('userPostCode'),
      userDetailAddress: state.signup.get('userDetailAddress'),
      errorCode: state.signup.getIn(['error', 'errorCode']),
      errorLog: state.signup.getIn(['error', 'errorLog']),
      checkIdSuccessMessage: state.signup.get('checkIdSuccessMessage')
      
  }),
  (dispatch) => ({
      SignupActions: bindActionCreators(signupActions, dispatch)
  })
)(withRouter(SignupContainer));
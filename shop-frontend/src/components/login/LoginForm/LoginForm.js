import React, {Component} from 'react';
import styles from './LoginForm.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

class LoginForm extends Component {
  handleChangeInput = (e) => {
    const { onChangeInput } = this.props;
    const { value, name } = e.target;
    onChangeInput({name, value});
  }

  handleKeyPress = (e) => {
    const { onLogin } = this.props;
    if(e.key === 'Enter'){
      onLogin();
    }
  }


  render() {
    const { userID, userPassword, onLogin, onResetErrors, errorCode, errorLog } = this.props;
    const { handleChangeInput, handleKeyPress } = this;
    if(errorCode) {
      alert(errorLog);
      onResetErrors();
    }
    return (
      <div className={cx('login-form-wrapper')}>
        <div className={cx('login-form-contents')}>
          <div className={cx('logo')}>
            로그인
          </div>
          <div className={cx('userID')}>
            <input 
              type="text" 
              name="userID" 
              className={cx('inputID')} 
              value={userID}
              onChange={handleChangeInput}
              placeholder="아이디를 입력해주세요."/>
          </div>
          <input 
            type="password" 
            name="userPassword" 
            value={userPassword}
            onChange={handleChangeInput}
            placeholder="패스워드를 입력해주세요." 
            className={cx('inputPassword')}
            onKeyPress={handleKeyPress}/>
            <div className={cx('submit-button')}>
              <Button type="default" onClick={onLogin}>로그인</Button>
            </div>
            <div className={cx('lead-signup')}>
              아직 가입하지않으셨나요? <Link to="/signup" className={cx('signup-link')}>가입하러가기</Link>
            </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
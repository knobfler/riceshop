import React, { Component } from 'react';
import styles from './SignupForm.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

if (typeof window === 'undefined') {
  global.window = {}
}

class SignupForm extends Component {

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    const { onChangeInput } = this.props;
    onChangeInput({name, value});
  }
  onAddressInputClick = () => {
    const { onChangeAddress } = this.props;
    const daum = window.daum;
    const $ = window.$;
    
    new daum.Postcode({
      oncomplete: (data) => {
        let fullAddr = '';
        let extraAddr = '';

        if (data.userSelectedType=== 'R') {
          fullAddr = data.roadAddress;

        } else {
          fullAddr = data.jibunAddress;
        }
        
        if(data.userSelectedType === 'R') {
          if(data.bname !== '') {
            extraAddr += data.bname;
          }
          if(data.buildingName !== '') {
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }

          fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
        }

        $('input[name=userPostCode]').val(data.zonecode);
        $('input[name=userPostAddress]').val(fullAddr);
        onChangeAddress({name: 'userPostCode' , value: data.zonecode});
        onChangeAddress({name: 'userPostAddress', value: fullAddr});

        $('input[name=userDetailAddress]').focus();
      }
  }).open();

  }
  render() {
    const { onAddressInputClick, handleChangeInput } = this;
    const { userID, userName, userEmail, userPassword, userPasswordCheck, userPostAddress, userPostCode, userDetailAddress } = this.props;
    const { onSignup, onCheckId, errorCode, errorLog, onResetErrors, checkIdSuccessMessage, onResetMessage } = this.props;
    if(errorCode !== '') {
      alert(errorLog);
      onResetErrors();
    }
    if(checkIdSuccessMessage !== '') {
      alert(checkIdSuccessMessage);
      onResetMessage();
    }
    return (
      <div className={cx('login-form-wrapper')}>
        <div className={cx('login-form-contents')}>
          <div className={cx('logo')}>
            회원가입
          </div>
          <div className={cx('userID')}>
          <input type="text" name="userID" value={userID} onChange={handleChangeInput} className={cx('inputID')} placeholder="아이디를 입력해주세요."/>
            <div className={cx('check-button')}>
              <Button type="default" onClick={onCheckId}>중복확인</Button>
            </div>
          </div>
          <input type="text" value={userName} onChange={handleChangeInput} name="userName" className={cx('inputUserName')} placeholder="실명을 입력해주세요."/>
          <input type="email" value={userEmail} onChange={handleChangeInput} name="userEmail" className={cx('inputUserEmail')} placeholder="이메일을 입력해주세요."/>
          <input type="password" value={userPassword} onChange={handleChangeInput} name="userPassword" placeholder="패스워드를 입력해주세요." className={cx('inputPassword')}/>
          <input
            type="password"
            name="userPasswordCheck"
            value={userPasswordCheck} onChange={handleChangeInput}
            className={cx('inputPassword')}
            placeholder="패스워드를 한번 더 입력해주세요."/>
          <div className={cx('userAddress')}>
          <input readOnly type="text" value={userPostAddress} onChange={handleChangeInput} name="userPostAddress" className={cx('inputAddress')} placeholder="주소"/>
            <div className={cx('address-button')}>
              <Button type="default" onClick={onAddressInputClick}>주소 입력</Button>
            </div>
          </div>
          <input type="text" readOnly value={userPostCode} onChange={handleChangeInput} name="userPostCode" className={cx('inputPostCode')} placeholder="우편번호"/>
          <input type="text" value={userDetailAddress} onChange={handleChangeInput} name="userDetailAddress" className={cx('inputDetailAddress')} placeholder="상세주소를 입력해주세요."/>
            <div className={cx('submit-button')}>
              <Button type="default" onClick={onSignup}>가입하기</Button>
            </div>
        </div>
      </div>
    );
  }
}

export default SignupForm;
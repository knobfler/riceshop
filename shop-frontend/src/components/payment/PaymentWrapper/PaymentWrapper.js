import React, {Component} from 'react';
import styles from './PaymentWrapper.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
const cx = classNames.bind(styles);

if (typeof window === 'undefined') {
  global.window = {}
}
const $ = window.$;


const PaymentWrapper = ({children}) => {

  
    return (
      <div className={cx('payment-wrapper')}>
      {children}
      </div>
    );
}

export default PaymentWrapper;
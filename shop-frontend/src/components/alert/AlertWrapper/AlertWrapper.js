import React from 'react';
import styles from './AlertWrapper.scss';
import classNames from 'classnames/bind';
import AlertList from '../AlertList/AlertList';

const cx = classNames.bind(styles);

const AlertWrapper = ({children}) => (
  <div className={cx('alert-wrapper')}>
    {children}
  </div>
);

export default AlertWrapper;
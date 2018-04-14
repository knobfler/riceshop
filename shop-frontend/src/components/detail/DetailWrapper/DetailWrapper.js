import React from 'react';
import styles from './DetailWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const DetailWrapper = ({children}) => (
  <div className={cx('detail-wrapper')}>
    {children}
  </div>
);

export default DetailWrapper;
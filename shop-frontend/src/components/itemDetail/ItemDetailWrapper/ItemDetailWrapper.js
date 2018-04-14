import React from 'react';
import styles from './ItemDetailWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ItemDetailWrapper = ({children}) => (
  <div className={cx('item-detail-wrapper')}>
    {children}
  </div>
);

export default ItemDetailWrapper;
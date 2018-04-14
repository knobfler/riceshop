import React from 'react';
import styles from './CartWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CartWrapper = ({children}) => (
  <div className={cx('cart-wrapper')}> 
    {children}
  </div>
);

export default CartWrapper;
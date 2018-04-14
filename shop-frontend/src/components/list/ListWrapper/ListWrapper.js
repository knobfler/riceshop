import React from 'react';
import styles from './ListWrapper.scss';
import classNames from 'classnames/bind';
import Item from 'components/list/Item';

const cx = classNames.bind(styles);

const ListWrapper = ({children}) => (
  <div className={cx('list-wrapper')}>
    {children}
  </div>
);

export default ListWrapper;
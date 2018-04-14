import React from 'react';
import styles from './MenuBar.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const MenuBar = () => (
  <div className={cx('menu-bar')}>
    <div className={cx('menu-content')}>
        <Link to="/" className={cx('menu')}>
          홈
        </Link>
        <Link to="/alert" className={cx('menu')}>
          공지사항
        </Link>
        <Link to="/list" className={cx('menu')}>
          상품
        </Link>
    </div>
  </div>
);

export default MenuBar;
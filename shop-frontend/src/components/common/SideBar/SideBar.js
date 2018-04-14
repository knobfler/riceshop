import React from 'react';
import styles from './SideBar.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const MenuItem = ({ to, children, onClick}) => {
  return (<Link onClick={onClick} className={cx('menu-item')} to={to}>{children}</Link>)
}

const SideBar = ({
  visible,
  onLoginClick,
  onAlertClick,
  onItemClick,
  onClose,
  onLogout,
  logged,
  memberLogged,
  hideSidebar,
  onMemberLogout
}) => (
  <div className={cx('sidebar-wrapper', {hidden: !visible})}>
    <div className={cx('menu')}>
      { logged && [<MenuItem to="/upload" key="item" onClick={onClose}>상품등록</MenuItem>,
        <MenuItem to="/editor" key="alert" onClick={onClose}>공지작성</MenuItem>]}
      {
        memberLogged ? [
          <MenuItem to="/" key="logout" onClick={onMemberLogout}>로그아웃</MenuItem>
        ] : [
          <MenuItem to="/login" key="login" onClick={hideSidebar}>로그인</MenuItem>,
          

        ]
      }
      <MenuItem to="/cart" key="cart" onClick={hideSidebar}>장바구니</MenuItem>
    </div>
  </div>
);

export default SideBar;
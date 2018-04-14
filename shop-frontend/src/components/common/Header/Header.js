import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import FaAlignJustify from 'react-icons/lib/fa/align-justify';
import SideBar from '../SideBar/SideBar';
import Hamburger from '../Hamburger/Hamburger';
const cx = classNames.bind(styles);


const Header = ({isAlert, logged, sidebarVisible, onToggle, memberLogged, onMemberLogout, hideSidebar}) => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <div className={cx('brand')}>
        <Link to="/">Shop</Link>
      </div>
      <div className={cx('right')}>
      {
        (logged) && [
          <Button theme="outline" key="editor" to="/editor">공지 작성하기</Button>,
          <Button theme="outline" key="upload" to="/upload">상품 올리기</Button>
        ]
      }
      {
        (memberLogged) ? [<Button theme="outline" key="logout" onClick={onMemberLogout}>로그아웃</Button>] : [<Button theme="outline" key="login" to="/login">로그인</Button>]
      }
       <Button theme="outline" to="/cart">장바구니</Button> 
      </div>
      <div className={cx('burger')}>
        {/* <FaAlignJustify onClick={onToggle}/> */}
        <Hamburger onToggle={onToggle} active={sidebarVisible}/>
        <SideBar 
          hideSidebar={hideSidebar} 
          memberLogged={memberLogged} 
          logged={logged} 
          visible={sidebarVisible}
          onMemberLogout={onMemberLogout}/>
      </div>
    </div>
  </header>
);


export default Header;
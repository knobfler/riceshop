import React from 'react';

import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import MenuBar from 'components/common/MenuBar';
import FooterConainter from 'containers/common/FooterConainter';
import HeaderContainer from 'containers/common/HeaderContainer';

const cx = classNames.bind(styles);

const PageTemplate = ({children}) => (
  <div className={cx('page-template')}>
    <div className={cx('fixed-nav')}>
      <HeaderContainer/>
      <MenuBar/>
    </div>
    <main>
      {children}
    </main>
    <FooterConainter/>
  </div>
);

export default PageTemplate;
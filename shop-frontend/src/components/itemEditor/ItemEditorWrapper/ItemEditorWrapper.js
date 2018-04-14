import React from 'react';
import styles from './ItemEditorWrapper.scss';
import classNames from 'classnames/bind';
import ItemEditorPane from 'components/itemEditor/ItemEditorPane';
import Button from 'components/common/Button';
const cx = classNames.bind(styles);

const ItemEditorWrapper = ({children, onGoBack, onSubmit}) => (
  <div className={cx('item-editor-wrapper')}>
    <div className={cx('header')}>
      <div className={cx('back')}>
      <Button onClick={onGoBack} theme="outline">뒤로가기</Button>
      </div>
      <div className={cx('submit')}>
      <Button onClick={onSubmit} theme="outline">작성하기</Button>
      </div>
    </div>
    {children}
  </div>
);

export default ItemEditorWrapper;
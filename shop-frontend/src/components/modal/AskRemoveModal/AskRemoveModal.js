import React from 'react';
import styles from './AskRemoveModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';
const cx = classNames.bind(styles);

const AskRemoveModal = ({onCancel, onConfirm}) => (
  <ModalWrapper>
    <div className={cx('form')}>
      <div className={cx('close')} onClick={onCancel}>&times;</div>
      <div className={cx('title')}>정말로 삭제하시겠습니까?</div>
      <div className={cx('remove')}>
        <Button theme="remove" onClick={onConfirm}>삭제</Button>
      </div>
    </div>
  </ModalWrapper>
);

export default AskRemoveModal;
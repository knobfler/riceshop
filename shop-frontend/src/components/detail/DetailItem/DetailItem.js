import React from 'react';
import styles from './DetailItem.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const DetailItem = ({title, body, logged, onRemoveClick, id}) => (
  <div className={cx('detail-item')}>
    <div className={cx('remove')}>
      {
        logged && [
          <Button theme="remove" key="remove" onClick={onRemoveClick}>삭제하기</Button>,
          <Button theme="default" key="edit" to={`/editor?id=${id}`}>수정하기</Button>
        ]
      }
    </div>
    <div className={cx('title')}>
      {title}
    </div>
    <div className={cx('body')}>
      {body}
    </div>
  </div>
);

export default DetailItem;
import React from 'react';
import styles from './AlertList.scss';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';
const cx = classNames.bind(styles);

const AlertItem = ({id, title, body, publishedDate}) => {
  return (
        <div className={cx('alert-item')}>
        <Link to={`/alert/detail/${id}`}>
          <div className={cx('alert-title')}>
            {title}
          </div>
          <div className={cx('alerted-date')}>
            {publishedDate}
          </div>
          <div className={cx('writer')}>
            작성자: 농장주
          </div>
          </Link>
        </div>
  )
}

const AlertList = ({alerts}) => {
  const alertList = alerts.map(
    (alert) => {
    const {_id, title, body, publishedDate} = alert.toJS();
    return (
      <AlertItem
        id={_id}
        key={_id}
        title={title}
        body={body}
        publishedDate={publishedDate}/>
    );
  });

  return (
    <div className={cx('alert-table')}>
      {alertList}
    </div>
  )
}

export default AlertList;
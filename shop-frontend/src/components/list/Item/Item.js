import React from 'react';
import styles from './Item.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const ItemEach = ({id, title, imageNames}) => {
  return (
    <Link to={`/item/${id}`} className={cx('item')}>
        <img src={`/images/${imageNames.split(',')[0]}`}/>
        <div className={cx('item-name')}>
          {title}
        </div>
      </Link>
  )
}

const Item = ({items}) =>{
  const { id, title, body, price, imageNames, publishedDate } = items.toJS();
  const itemList = items.map(
    (item) => {
      const { _id, title, imageNames } = item.toJS();
      return (
        <ItemEach
          id={_id}
          key={_id}
          title={title}
          imageNames={imageNames}/>
      )
    }
  )
  return (  
    <div className={cx('item-box')}>
      {itemList}
    </div>
  );
} 

export default Item;
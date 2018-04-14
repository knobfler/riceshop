import React from 'react';
import styles from './CartList.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import {Link} from 'react-router-dom';
const cx = classNames.bind(styles);

const CartList = ({cartList, onRemove, onRemoveById, onChangeAmountOnCartPage}) => {

  if (cartList.size !== 0) {    
    // let toJSed = cartList.map((cart, i) => {
    //   return cart;
    // });
    const list = cartList.toJS();

    const trTds = Object.keys(list).map(
      (key, index) => {
        // console.log(list[key].title);
        // console.log(index);
          return (
        <tr key={key}>
          <td>
            <Link to={`/item/${key}`}>
              <img src={`/images/${list[key].thumbnailImage}`}/>
            </Link>
          </td>
          <td>
            <Link to={`/item/${key}`}>
              {list[key].title}
            </Link>
          </td>
          <td>
            {list[key].amount}
          </td>
          <td>{list[key].totalPrice}</td>
          <td
            id={key}
            className={cx('remove-button')}
            onClick={(e) => {
            onRemoveById(key)
          }}>✖︎</td>
        </tr>
      )
        
      }
    )

    console.log(trTds);



    // console.log(toJSed);

    // const values = cartList.valueSeq().map(([k, v]) => {
    //   console.log(v.toJS());
    // });

    // console.log(values);


    // const cartListArray = toJSed.map((cart, i) => {
    //   return (
    //     <tr key={i}>
    //       <td>
    //         <Link to={`/item/${i}`}>
    //           <img src={`/api/images?${cart.get("thumbnailImage")}`}/>
    //         </Link>
    //       </td>
    //       <td>
    //         <Link to={`/item/${i}`}>
    //           {cart.get("title")}
    //         </Link>
    //       </td>
    //       <td>
    //         {cart.get("amount")}
    //       </td>
    //       <td>{cart.get("totalPrice")}</td>
    //       <td
    //         id={i}
    //         className={cx('remove-button')}
    //         onClick={(e) => {
    //         onRemoveById(i)
    //       }}>✖︎</td>
    //     </tr>
    //   )
    // });
    // console.log(cartListArray);
    // const carts = cartListArray.toJS();

    // const trTdCart = carts.map(   (cart, i) => {     return(             <tr
    // key={i}>                <td>                  <Link to={`/item/${i}`}>
    //            <img src={`/api/images?${cart[i].thumbnailImage}`} />
    //     </Link>                </td>                 <td>                 <Link
    // to={`/item/${i}`}>                   {cart[i].title}                 </Link>
    //                </td>                <td>                {cart[i].amount}
    //            </td>                <td>{cart.get("totalPrice")}</td>
    //    <td id={i} className={cx('remove-button')} onClick={(e) => {
    //    onRemoveById(cart.get("id"))                }}>✖︎</td>              </tr>
    //          );   } ) const cartListArray = cartList.map(   (cart, i) => {
    // return(       <tr key={i}>          <td>            <Link
    // to={`/item/${cart.get("id")}`}>             <img
    // src={`/api/images?${cart.get("thumbnailImage")}`} />            </Link>
    //    </td>           <td>           <Link to={`/item/${cart.get("id")}`}>
    //       {cart.get("title")}           </Link>           </td>          <td>
    //      {cart.get("amount")}           </td>
    // <td>{cart.get("totalPrice")}</td>          <td id={i}
    // className={cx('remove-button')} onClick={(e) => {
    // onRemoveById(cart.get("id"))          }}>✖︎</td>        </tr>     )   } );

    return (
      <div className={cx('cart-list')}>
        <div className={cx('cart-content')}>
          <table className={cx('cart-table')}>
            <thead>
              <tr>
                <th>상품 이미지</th>
                <th>상품 이름</th>
                <th>상품 수량</th>
                <th>결제 가격</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>

              {
           trTds
         }
              {/* <tr>
            <td colSpan="4"></td>
            <td onClick={onRemove}>삭제</td>
          </tr> */}
            </tbody>
          </table>
          <div className={cx('submit-button')}>
            <Button theme="gray" to="/payment">주문하기</Button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={cx('cart-list')}>
        <div className={cx('cart-content')}>
          <table className={cx('cart-table')}>
            <thead>
              <tr>
                <th>상품 이미지</th>
                <th>상품 이름</th>
                <th>상품 수량</th>
                <th>결제 가격</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4">장바구니가 비었습니다.</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>
    );
  }

}

export default CartList;

// if(cartList) {   const cartListArray = cartList.map(     (cart, i) => {
// const cartArray = cart.split("/");       if(cartList.size === i + 1) {
//  return (           <tr key={i}>             <td colSpan="2">합계</td>
//    <td>{cartArray[0]}</td>             <td>{cartArray[1]}</td>
// <td className={cx('remove-button')} onClick={onRemove}>✖︎</td>
// </tr>         )       } else {         const cartArray = cart.split("/");
//   return (         <tr key={i}>           <td>             <img
// src={`/api/images?${cartArray[2]}`} />           </td>
// <td>{cartArray[0]}</td>           <td>{cartArray[1]}</td>
// <td>{cartArray[3]}</td>           <td id={i} className={cx('remove-button')}
// onClick={(e) => {             onRemoveById(e.target.id)           }}>✖︎</td>
//        </tr>       )       }     }   )   return (     <div
// className={cx('cart-list')}>       <div className={cx('cart-content')}>
//   <table className={cx('cart-table')}>           <thead>             <tr>
//           <th>상품 이미지</th>               <th>상품 이름</th>               <th>상품
// 수량</th>               <th>결제 가격</th>               <th>삭제</th>
// </tr>           </thead>           <tbody>          {
// cartListArray          }           </tbody>         </table>         <div
// className={cx('submit-button')}>           <Button theme="gray"
// to="/payment">주문하기</Button>         </div>       </div>     </div>   ); }
// else {   return (     <div className={cx('cart-list')}>       <div
// className={cx('cart-content')}>         <table className={cx('cart-table')}>
//          <thead>             <tr>               <th>상품 이미지</th>
// <th>상품 이름</th>               <th>상품 수량</th>               <th>결제 가격</th>
//        </tr>           </thead>           <tbody>             <tr>
//    <td colSpan="4">장바구니가 비었습니다.</td>             </tr>           </tbody>
//     </table>       </div>     </div>   ); }
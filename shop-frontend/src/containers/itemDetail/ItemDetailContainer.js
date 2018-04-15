import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DetailItem from 'components/itemDetail/DetailItem';
import * as itemActions from 'store/modules/item';
import * as cartActions from 'store/modules/cart';
import {withRouter} from 'react-router-dom';
import shouldCancel from 'lib/shouldCancel';

class ItemDetailContainer extends Component {

  getItemById = async() => {
    // if(shouldCancel()) return;
    const {ItemActions, id} = this.props;
    try {
      await ItemActions.getItemById(id);
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.price !== this.props.price) {
      this.initializeEachItemTotalPrice({eachItemPrice: this.props.price});
    }
  }

  initializeEachItemTotalPrice = ({eachItemPrice}) => {
    const {CartActions} = this.props;
    CartActions.initializeEachItemTotalPrice({eachItemPrice});
  }

  componentDidMount() {
    const {CartActions} = this.props;
    this.getItemById();
    CartActions.initialize();

  }

  handleChangePriceBySelection = ({price}) => {
    const {CartActions} = this.props;
    CartActions.changeBySelection({price});
    // const { ItemActions } = this.props;
    // ItemActions.changePriceBySelection({price});
  }

  handleChangeAmount = ({value, price}) => {
    const {CartActions} = this.props;
    CartActions.changeAmount({value, price});
  }

  addCartList = () => {
    const {
      CartActions,
      id,
      title,
      amount,
      imageNames,
      eachItemTotalPrice
    } = this.props;
    const thumbnailImage = imageNames
      .split(',')
      .slice(0, this.props.imageNames.split(',').length - 1)[0];

    // try {    await CartActions.addCartList({id, title, amount, thumbnailImage,
    // totalPrice: eachItemTotalPrice}); } catch(e) {   console.log(e); }
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(unescape(document.cookie));
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    function setCookieHour(name, value, hours) {
      var now = new Date();
      var time = now.getTime();
      time += 3600 * 1000 * hours;
      now.setTime(time);
      document.cookie = name + "=" + escape(value) + "; path=/; expires=" + now.toUTCString() + ";"
    }

    let cartList = {};

    if (getCookie('cartList')) {
      cartList = JSON.parse(getCookie('cartList'));
    }

    cartList[id] = {
      title: title,
      amount: amount,
      thumbnailImage: thumbnailImage,
      totalPrice: eachItemTotalPrice
    };

    setCookieHour('cartList', JSON.stringify(cartList), 3);
    alert('카트에 상품이 담겼습니다!');

  }

  resetCartLog = () => {
    const {CartActions} = this.props;
    CartActions.resetCartLog();
  }

  removeItemById = async() => {
    const {ItemActions, history, itemId} = this.props;

    try {
      await ItemActions.removeItemById(itemId);
      alert("아이템이 삭제되었습니다.");
      history.push("/list");
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {
      itemId,
      title,
      body,
      price,
      imageNames,
      publishedDate,
      amount,
      eachItemTotalPrice,
      cartLog,
      errorCode,
      errorLog,
      logged
    } = this.props;
    const {
      handleChangePriceBySelection,
      handleChangeAmount,
      addCartList,
      resetCartLog,
      removeItemById,
      updateItemById
    } = this;
    return (<DetailItem
      amount={amount}
      id={itemId}
      title={title}
      body={body}
      price={price}
      imageNames={imageNames}
      publishedDate={publishedDate}
      onChangePriceBySelection={handleChangePriceBySelection}
      onChangeAmount={handleChangeAmount}
      eachItemTotalPrice={eachItemTotalPrice}
      addCartList={addCartList}
      cartLog={cartLog}
      onResetCartLog={resetCartLog}
      errorCode={errorCode}
      errorLog={errorLog}
      logged={logged}
      onRemoveItemById={removeItemById}/>);
  }
}

export default connect((state) => ({
  itemId: state
    .item
    .getIn(['item', 'id']),
  title: state
    .item
    .getIn(['item', 'title']),
  body: state
    .item
    .getIn(['item', 'body']),
  price: state
    .item
    .getIn(['item', 'price']),
  imageNames: state
    .item
    .getIn(['item', 'imageNames']),
  publishedDate: state
    .item
    .getIn(['item', 'publishedDate']),
  amount: state
    .cart
    .get('amount'),
  eachItemTotalPrice: state
    .cart
    .get('eachItemTotalPrice'),
  cartLog: state
    .cart
    .get('cartLog'),
  errorCode: state
    .cart
    .getIn(['error', 'errorCode']),
  errorLog: state
    .cart
    .getIn(['error', 'errorLog']),
  logged: state
    .base
    .get('logged')
}), (dispatch) => ({
  ItemActions: bindActionCreators(itemActions, dispatch),
  CartActions: bindActionCreators(cartActions, dispatch)
}))(withRouter(ItemDetailContainer));
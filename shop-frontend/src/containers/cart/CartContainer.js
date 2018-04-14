import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cartActions from 'store/modules/cart';
import CartWrapper from 'components/cart/CartWrapper';
import CartList from 'components/cart/CartList';
import { withRouter } from 'react-router-dom';

if (typeof window === 'undefined') {
    global.window = {}
}

const $ = window.$;

class CartContainer extends Component {
    getCartList = () => {
        const { CartActions } = this.props;
        let totalAmount = 0;
        let totalPrice = 0;
        // try {
        //     await CartActions.getCartList();

        // } catch(e){
        //     console.log(e);
        // }

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


        if(typeof(getCookie('cartList')) !== undefined && getCookie('cartList').length !== 0 && getCookie('cartList') !== "") {
            // console.log(getCookie('cartList'));
            let cartList = JSON.parse(unescape(getCookie('cartList')));
            for(let key in cartList) {
                totalPrice += cartList[key].totalPrice;
            }
            CartActions.getCartList({cartList, totalPrice});
        }

    };

    componentDidMount() {
        this.getCartList();
        
        
    }

    removeCartList = async () => {
        const {  CartActions } = this.props;
        try {
            await CartActions.removeCartList();
            alert("모든 카트 항목이 삭제되었습니다.");
        } catch(e) {
            console.log(e);
        }
    }

    removeCartById = (id) => {
        const { CartActions } = this.props;
        // try {
        //     await CartActions.removeCartById(id);
        //     // this.getCartList();
        // } catch(e) {
        //     console.log(e);
        // }

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
            delete cartList[id];
            setCookieHour('cartList', JSON.stringify(cartList), 3);
            cartList = JSON.parse(unescape(getCookie('cartList')));
            CartActions.removeCartById(id);
          }
      
        //   cartList[id] = null;
      
        //   setCookieHour('cartList', JSON.stringify(cartList), 3);
    }

    changeAmountOnCartPage = ({amount}) => {
        const { CartActions } = this.props;
        CartActions.changeAmountOnCartPage({amount});
    }

    

    addCartList = async () => {
        console.log("hi");
        const { CartActions, id, title, amount, imageNames, eachItemTotalPrice } = this.props;
        const thumbnailImage = imageNames.split(',').slice(0, this.props.imageNames.split(',').length - 1)[0];
    
        // try {
        //    await CartActions.addCartList({id, title, amount, thumbnailImage, totalPrice: eachItemTotalPrice});
        // } catch(e) {
        //   console.log(e);
        // }

        

      }

    
 render() {
     const { cartList } = this.props;
     const { removeCartList, removeCartById, changeAmountOnCartPage } = this;
   return (
    <CartWrapper>
        <CartList 
            cartList={cartList} 
            onRemove={removeCartList} 
            onRemoveById={removeCartById}
            onChangeAmountOnCartPage={changeAmountOnCartPage}
            />
    </CartWrapper>
   );
 }
}

export default connect(
  (state) => ({
      cartList: state.cart.get('cartList'),
      totalPrice: state.cart.get('totalPrice'),
      totalAmount: state.cart.get('totalAmount'),
      memberLogged: state.base.get('memberLogged')
  }),
  (dispatch) => ({
      CartActions: bindActionCreators(cartActions, dispatch)
  })
)(withRouter(CartContainer));
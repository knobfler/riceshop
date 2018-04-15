import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PaymentWrapper from 'components/payment/PaymentWrapper';
import PaymentContent from 'components/payment/PaymentContent';
import * as paymentActions from 'store/modules/payment';
import * as cartActions from 'store/modules/cart';
import { withRouter } from 'react-router-dom';
import shouldCancel from 'lib/shouldCancel';



class PaymentContainer extends Component {
    getCartList =  () => {
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

          console.log(getCookie('cartList'));

        if(typeof(getCookie('cartList')) !== undefined && getCookie('cartList').length !== 0 && getCookie('cartList') !== "") {
            // console.log(getCookie('cartList'));
            let cartList = JSON.parse(unescape(getCookie('cartList')));
            for(let key in cartList) {
                totalPrice += cartList[key].totalPrice;
            }
            CartActions.getCartList({cartList, totalPrice});
        }
    }

    getUserInfo = async () => {
        // if(shouldCancel()) return;
        const { PaymentActions } = this.props;

        try {
            await PaymentActions.getUserInfo({userID: localStorage.loggedMember});
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getCartList();
        this.getUserInfo();
        const { cartList, history } = this.props;

        
    }
    componentDidUpdate(prevProps, prevState) {
        const { history } = this.props;
        if(prevProps.cartList !== this.props.cartList) {
            if(this.props.cartList.size === 0) {
                alert("장바구니가 비어있습니다.");
                history.push("/cart");
            }
        }
    }

    changeInput = ({name, value}) => {
        const { PaymentActions } = this.props;
        PaymentActions.changeInput({name, value});
    }
    render() {
        const { cartList, 
                memberLogged, 
                info, 
                totalPrice,
                userinfoPhonePost,
                userinfoPhoneRear,
                userinfoSecondPhonePost,
                userinfoSecondPhoneRear,
                userinfoPostCode,
                userinfoName,
                userID,
                userinfoEmail,
                userinfoAddress,
                userinfoDetailAddress,
                userRequestMessage} = this.props;
        const { changeInput } = this;
        return (
            <PaymentWrapper>
                <PaymentContent 
                    cartList={cartList} 
                    memberLogged={memberLogged}
                    info={info}
                    totalPrice={totalPrice}
                    onChangeInput={changeInput}
                    userinfoPhonePost={userinfoPhonePost}
                    userinfoPhoneRear={userinfoPhoneRear}
                    userinfoSecondPhonePost={userinfoSecondPhonePost}
                    userinfoSecondPhoneRear={userinfoSecondPhoneRear}
                    userinfoPostCode={userinfoPostCode}
                    userinfoName={userinfoName}
                    userID={userID}
                    userinfoEmail={userinfoEmail}
                    userinfoAddress={userinfoAddress}
                    userinfoDetailAddress={userinfoDetailAddress}
                    userRequestMessage={userRequestMessage}/>
            </PaymentWrapper>
        );
    }
}

export default connect((state) => ({
    cartList: state.cart.get('cartList'),
    memberLogged: state.base.get('memberLogged'),
    info: state.payment.get('info'),
    totalPrice: state.cart.get('totalPrice'),
    userinfoPhonePost: state.payment.get('userinfoPhonePost'),
    userinfoPhoneRear: state.payment.get('userinfoPhoneRear'),
    userinfoSecondPhonePost: state.payment.get('userinfoSecondPhonePost'),
    userinfoSecondPhoneRear: state.payment.get('userinfoSecondPhoneRear'),
    userinfoPostCode: state.payment.get('userinfoPostCode'),
    userinfoName: state.payment.get('userinfoName'),
    userID: state.payment.get('userID'),
    userinfoEmail: state.payment.get('userinfoEmail'),
    userinfoAddress: state.payment.get('userinfoAddress'),
    userinfoDetailAddress: state.payment.get('userinfoDetailAddress'),
    userRequestMessage: state.payment.get('userRequestMessage')
}), (dispatch) => ({
    PaymentActions: bindActionCreators(paymentActions, dispatch),
    CartActions: bindActionCreators(cartActions, dispatch)
}))(withRouter(PaymentContainer));
import React, { Component } from 'react';
import styles from './PaymentContent.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
const cx = classNames.bind(styles);

if (typeof window === 'undefined') {
  global.window = {}
}
const $ = window.$;

var IMP = window.IMP;

const isBrowser = process.env.APP_ENV === 'browser';
if(isBrowser) {
  IMP.init('imp55957545');
}



class PaymentContent extends Component {

  state = {
    userinfoName: '',
    userinfoEmail: '',
    userinfoAddress: '',
    userinfoPostCode: '',
    userinfoDetailAddress: '',
    userinfoPhonePost: '',
    userinfoPhoneRear: '',
    userinfoSecondPhonePost: '',
    userinfoSecondPhoneRear: '',
    userRequestMessage: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.info !== this.props.info) {
      this.setState({
        userinfoName: this.props.info.userName,
        userinfoEmail: this.props.info.userEmail,
        userinfoAddress: this.props.info.userPostAddress,
        userinfoPostCode: this.props.info.userPostCode,
        userinfoDetailAddress: this.props.info.userDetailAddress
      });
    }
  }

  
  componentWillReceiveProps(nextProps) {
    if(!nextProps.memberLogged) {
      alert("로그인후 이용가능합니다.");
      document.location.href = "/login";
    }
    
    // this.setState({
    //   userinfoName: nextProps.userName
    // })
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    const { onChangeInput } = this.props;
    onChangeInput({name, value});

    // let result = {};
    // result[name] = value;
    
    // this.setState(result);
  }



  testPay = () => {
    const { info } = this.props;
    console.log(info.userName);
  }

  handlePay = () => {
    const { totalPrice } = this.props;
    const { userinfoPhonePost,
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

    if(userinfoPhonePost === "" || userinfoPhoneRear === "" || userinfoPostCode === "" || userinfoName === "" ||
    userID === "" || userinfoEmail === "" || userinfoAddress === "" || userinfoDetailAddress === "") {
      alert("입력되지 않은 사항을 채워주세요.");
      return;
    }

    let amount = totalPrice;
    let buyer_email = userinfoEmail;
    let buyer_name = userinfoName;
    let buyer_tel = $('select[name=phone-number]').val() + '-' +  userinfoPhonePost + '-' + userinfoPhoneRear;
    let buyer_address = userinfoAddress + ' / ' + userinfoDetailAddress;
    let buyer_postcode = userinfoPostCode;
    let buyer_request_message = userRequestMessage;

    
    IMP.request_pay({
      pg : 'html5_inicis',
      pay_method : 'card',
      merchant_uid : 'merchant_' + new Date().getTime(),
      name : '주문명:결제테스트',
      amount : amount,
      buyer_email : buyer_email,
      buyer_name : buyer_name,
      buyer_tel : buyer_tel,
      buyer_addr : buyer_address,
      buyer_postcode : buyer_postcode,
      buyer_request_message: buyer_request_message
  }, function(rsp) {
      if ( rsp.success ) {
        $.ajax({
          url: "/api/checkout/complete",
          type: 'POST',
          dataType: 'json',
          data: {
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
            paid_amount: rsp.paid_amount,
            apply_num: rsp.apply_num,

            buyer_email: buyer_email,
            buyer_name: buyer_name,
            buyer_tel: buyer_tel,
            buyer_addr: buyer_address,
            buyer_postcode: buyer_postcode,
            buyer_request_message: buyer_request_message
          }
        }).done(function(data) {
          // console.log(data);
          var msg = '결제가 완료되었습니다! 감사합니다.';
          // msg += '고유ID : ' + rsp.imp_uid;
          // msg += '상점 거래ID : ' + rsp.merchant_uid;
          // msg += '결제 금액 : ' + rsp.paid_amount;
          // msg += '카드 승인번호 : ' + rsp.apply_num;
          alert(msg);
          document.location.href = "/";
        });
          
      } else {
          var msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
          alert(msg);
      }
  
     
  });
    // IMP.request_pay({
    //   pg : 'inicis',
    //   pay_method : 'card',
    //   merchant_uid : 'merchant_' + new Date().getTime(),
    //   name : '쇼핑몰:결제테스트',
    //   amount : amount ,
    //   buyer_email : buyer_email,
    //   buyer_name : buyer_name,
    //   buyer_tel : buyer_tel,
    //   buyer_addr : buyer_address,
    //   buyer_postcode : buyer_postcode
    // }, (rsp) => {
    //   if(rsp.success) {
    //     $.ajax({
    //       url: "/api/checkout/complete",
    //       type: "POST",
    //       data: {
    //         imp_uid: rsp.imp_uid,
    //         merchant_uid: rsp.merchant_uid,
    //         paid_amount: rsp.paid_amount,
    //         apply_num: rsp.apply_num,

    //         buyer_email: buyer_email,
    //         buyer_name: buyer_name,
    //         buyer_tel: buyer_tel,
    //         buyer_addr: buyer_address,
    //         buyer_postcode: buyer_postcode,

    //         status: "결제 완료"
    //       }

    //     }).done((res) => {
    //       alert("결제가 완료되었습니다.");
    //       document.location.href = "/checkout/success";
    //     }).fail((err) => {
    //       console.log(err);
    //     })
    //   } else {
    //     let msg = '결제에 실패하였습니다.';
    //     msg += '에러내용 : ' + rsp.error_msg;
    //     alert(msg);
    //   }
    // });
    return false;
  }
  
  render() {
    const { cartList, 
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
            userRequestMessage } = this.props;
    const { handlePay, handleChangeInput } = this;
    if(cartList) {
      const list = cartList.toJS();
      const cartInfos = Object.keys(list).map(
        (key, index) => {
          return (
            <div className={cx('body')} key={key}>
            <div className={cx('content')}>
              <img src={`/images/${list[key].thumbnailImage}`} />
            </div>
            <div className={cx('content')}>
            {list[key].title}
            </div>
            <div className={cx('content')}>
            {list[key].amount}
            </div>
            <div className={cx('content')}>
            {list[key].totalPrice}
            </div>
          </div>
          )
        }
      )
      // const cartArrayList = cartList.map(
      //   (cart, i) => {
      //     return (
      //       <div className={cx('body')} key={i}>
      //       <div className={cx('content')}>
      //         <img src={`/api/images?${cart.get("thumbnailImage")}`} />
      //       </div>
      //       <div className={cx('content')}>
      //       {cart.get("title")}
      //       </div>
      //       <div className={cx('content')}>
      //       {cart.get("amount")}
      //       </div>
      //       <div className={cx('content')}>
      //       {cart.get("totalPrice")}
      //       </div>
      //     </div>
      //     )
      //   }
      // );

      return (
        <div className={cx('payment-content')}>
          <div className={cx('description')}>
            주문/결제
          </div>
          <hr/>
          <div className={cx('cart-list')}>
            주문 리스트
            <div className={cx('cart-table')}>
              <div className={cx('header')}>
                <div className={cx('menu')}>
                  제품이미지
                </div>
                <div className={cx('menu')}>
                  제품 이름
                </div>
                <div className={cx('menu')}>
                  제품 수량
                </div>
                <div className={cx('menu')}>
                  결제 가격
                </div>
                
              </div>
              
              {
                cartInfos
              }
            </div>
            <div className={cx('user-info')}>
              주문자 정보
              <hr/>
              <div className={cx('user-info-list')}>
                <div className={cx('info')}>
                  <div className={cx('title')}>
                    이름
                  </div>
                  <div className={cx('content')}>
                    <input type="text" name="userinfoName" onChange={handleChangeInput} value={userinfoName}/>
                  </div>
                </div>
                <div className={cx('info')}>
                  <div className={cx('title')}>
                    이메일
                  </div>
                  <div className={cx('content')}>
                    {userinfoEmail}
                  </div>
                </div>
                <div className={cx('info')}>
                  <div className={cx('title')}>
                    연락처
                  </div>
                  <div className={cx('content')}>
                  <select name="phone-number">
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="02">02</option>
                    <option value="032">032</option>
                  </select>
                  &nbsp;
                  -&nbsp;
                  <input 
                    type="text" 
                    name="userinfoPhonePost" 
                    value={userinfoPhonePost}
                    onChange={handleChangeInput}/>
                  &nbsp;
                  -&nbsp;
                  <input 
                    type="text" 
                    name="userinfoPhoneRear"
                    value={userinfoPhoneRear}
                    onChange={handleChangeInput}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('post-info')}>
              배송 정보
              <hr/>
              <div className={cx('post-info-list')}>
                <div className={cx('info')}>
                  <div className={cx('title')}>
                    이름
                  </div>
                  <div className={cx('content')}>
                    <input 
                      type="text" 
                      name="userinfoName" 
                      onChange={handleChangeInput}
                      value={userinfoName}/>
                  </div>
                </div>
                <div className={cx('info')}>
                  <div className={cx('title')}>
                    연락처
                  </div>
                  <div className={cx('content')}>
                  <div className={cx('phone')}>
                      <div className={cx('phone-1')}>
                          연락처 1
                          <div className={cx('phone')}>
                          <select>
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="02">02</option>
                            <option value="032">032</option>
                          </select>
                          &nbsp;
                          -&nbsp;
                          <input 
                            type="text" 
                            name="userinfoPhonePost"
                            value={userinfoPhonePost}
                            onChange={handleChangeInput}/>
                          &nbsp;
                          -&nbsp;
                          <input 
                            type="text" 
                            name="userinfoPhoneRear"
                            value={userinfoPhoneRear}
                            onChange={handleChangeInput}/>
                          </div>
                      </div>
                      <div className={cx('phone-2')}>
                          연락처 2
                          <div className={cx('phone')}>
                          <select>
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="02">02</option>
                            <option value="032">032</option>
                          </select>
                          &nbsp;
                          -&nbsp;
                          <input 
                            type="text" 
                            name="userinfoSecondPhonePost"
                            onChange={handleChangeInput}
                            value={userinfoSecondPhonePost}/>
                          &nbsp;
                          -&nbsp;
                          <input 
                            type="text" 
                            name="userinfoSecondPhoneRear"
                            onChange={handleChangeInput}
                            value={userinfoSecondPhoneRear}/>
                          </div>
                      </div>
                  </div>
                  </div>
                </div>
                <div className={cx('info')}>
                  <div className={cx('title')}>
                    배송지 주소
                  </div>
                  <div className={cx('content')}>
                    우편번호
                    <div className={cx('post-code')}>
                      <input 
                        type="text" 
                        name="userinfoPostCode" 
                        onChange={handleChangeInput}
                        value={userinfoPostCode}/>
                    </div>
                    주소
                    <div className={cx('post-address')}>
                      <input 
                        type="text" 
                        name="userinfoAddress" 
                        onChange={handleChangeInput}
                        value={userinfoAddress}/>
                      &nbsp;
                      -
                      &nbsp;
                      <input 
                        type="text" 
                        name="userinfoDetailAddress" 
                        onChange={handleChangeInput}
                        value={userinfoDetailAddress}/>
                    </div>
                  </div>
                </div>
                <div className={cx('info')}>
                  <div className={cx('title')}>
                    주문 메시지
                  </div>
                  <div className={cx('content')}>
                    <input 
                      type="text"
                      name="userRequestMessage"
                      onChange={handleChangeInput}
                      value={userRequestMessage}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('payment-info')}>
              결제 정보
              <hr/>
              <div className={cx('payment-info-list')}>
                <div className={cx('info')}>
                  <div className={cx('title')}>
                    총 결제 금액
                  </div>
                  <div className={cx('content')}>
                  {totalPrice}
                  </div>
                </div>
                <div className={cx('info')}>
                  <div className={cx('title')}>
                    배송 비용
                  </div>
                  <div className={cx('content')}>
                    3000
                  </div>
                </div>
              </div>
              <div className={cx('buttons')}>
              <Button theme="gray" onClick={handlePay}>결제하기</Button>
              <Button theme="gray" to="/list">계속 쇼핑하기</Button>
              <Button theme="gray" to="/cart">장바구니로</Button>
              </div>
            </div>
          </div>
        </div>
      );

      
    }else {
      return null;
    }

    
  }
}

export default PaymentContent;
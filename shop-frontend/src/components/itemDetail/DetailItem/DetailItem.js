import React, {Component} from 'react';
import styles from './DetailItem.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
const cx = classNames.bind(styles);

const Images = ({image}) => {
  return (<img className={cx('item-image')} src={`/images/${image}`}/>)
}

class DetailItem extends Component {

  state = {
    initialPrice: 0,
    totalPrice: this.props.price,
    amount: 1,
    selectedOptionName: '',
    thumbnailImage: this.props.imageNames.split(',').slice(0, this.props.imageNames.split(',').length - 1)[0]
  }
  
  componentDidMount() {
    this.setState({
      selectedOptionName: this.selectOption.options[0].text
    });

  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      initialPrice: nextProps.price,
      totalPrice: nextProps.price,
      thumbnailImage: nextProps.imageNames.split(',').slice(0, nextProps.imageNames.split(',').length - 1)[0]
    });
    
  }

  handleChange = (e) => {
    const { value, selectedIndex } = e.target;
    const { amount } = this.props;
    this.setState({
      totalPrice: value * parseInt(amount, 10),
      initialPrice: value,
      selectedOptionName: e.target[selectedIndex].text
    });
  }

  handleChangeAmount = (e) => {
    const { value } = e.target;
    const { onChangeAmount, price } = this.props;
    onChangeAmount({value, price});
    // if(parseInt(value, 10) <= 0) {
    //   onChangeAmount({value, price});
      
    // } else {
    //   onChangeAmount({value, price});
    // }
    // onChangeTotalPrice({amount: value, price});
    // if(value=== "") {
    //   this.setState({
    //     totalPrice: 1 * this.state.initialPrice,
    //     amount: value
    //   });
    //   // return;
    // } else {
    //   this.setState({
    //     totalPrice: parseInt(value, 10) * this.state.initialPrice,
    //     amount: value
    //   });
    // }
    
  }



  addCart = async () => {
    const { totalPrice, amount, thumbnailImage } = this.state;
    const { id } = this.props;
    
    const title = this.props.title + " - " + this.state.selectedOptionName;
    // console.log(this.props.title + " - " + this.state.selectedOptionName);
    if(amount === "") {
      alert("수량을 입력해주세요.");
      return;
    }
    try {
      await axios.post(`/api/cart`, {id, title, amount, thumbnailImage, totalPrice}).then(
        (res) => {
          const { cartLog } = res.data;
          console.log(res);
          alert(cartLog);
        }
      ).catch((err) => {
        console.log(err.data);
      });
      // alert("선택하신 상품이 장바구니에 담겼습니다.");
    } catch(e) {
      console.log(e);
    }
  }

  handleChangePriceBySelection = (e) => {
    const { onChangePriceBySelection } = this.props;
    const { value } = e.target;
    onChangePriceBySelection({price: value});
  }

  handlePay = async () => {
    const { totalPrice, amount, thumbnailImage } = this.state;
    const { history } = this.props;
    const title = this.props.title + " - " + this.state.selectedOptionName;
    // console.log(this.props.title + " - " + this.state.selectedOptionName);
    if(amount === "") {
      alert("수량을 입력해주세요.");
      return;
    }
    try {
      await axios.post(`/api/cart`, {title, amount, thumbnailImage, totalPrice});
      history.push("/payment");
      // alert("선택하신 상품이 장바구니에 담겼습니다.");
    } catch(e) {
      console.log(e);
    }
  }

  
  render() {
    const {
      id,
      title,
      body,
      price,
      imageNames,
      publishedDate,
      onChangePriceBySelection,
      onChangeAmount,
      amount,
      eachItemTotalPrice,
      addCartList,
      cartLog,
      onResetCartLog,
      errorCode,
      errorLog,
      logged,
      onRemoveItemById
    } = this.props;



    const { handlePay, handleChangeAmount, handleChangePriceBySelection } = this;
    if (imageNames !== undefined) {
      const imageNameArray = imageNames
        .split(',')
        .slice(0, imageNames.split(',').length - 1);
      
  
      const imageList = imageNameArray.map((imageName) => {
        return (<Images key={imageName} image={imageName}/>)
      })
  
      

      if(cartLog) {
        alert(cartLog);
        onResetCartLog();
      }

      if(errorCode) {
        alert(errorLog);
        onResetCartLog();
      }
  
      return (
        <div className={cx('detail-item')}>
          <div className={cx('detail-item-contents')}>
            <div className={cx('admin-buttons')}>
            {
              logged && [<Button theme="gray" key="delete" onClick={onRemoveItemById}>삭제하기</Button>,
              <Button theme="gray" key="patch" to={`/upload?id=${id}`}>수정하기</Button>]
            }
            </div>
            <div className={cx('header')}>
              <div className={cx('thumbnail-image')}>
                <img
                  src={`/images/${imageNameArray[0]}`}
                  className={cx('thumbnail')}
                  alt="Thumbnail"/>
              </div>
              <div className={cx('buy-box')}>
                <div className={cx('title')}>
                  {title}
                </div>
                <hr/>
                <div className={cx('price')}>
                기본 가격: {price}원
                </div>
                <div className={cx('kg')}>
                용량
                  <select ref={ref=>this.selectOption=ref} onChange={handleChangePriceBySelection} className={cx('kg-selector')}>
                    <option value={price} origin="발아용 현미 1kg">발아용 현미 1kg</option>
                    <option value={price + parseInt(7700, 10)} origin="발아용 현미 3kg(+ 7,700원)">발아용 현미 3kg(+ 7,700원)</option>
                  </select>
                </div>
                <div className={cx('amount')}>
                수량
                  <input 
                    type="number" 
                    ref={ref=> this.amount = ref}
                    min="1" 
                    value={amount}
                    onChange={handleChangeAmount}
                    className={cx('amount-input')} />
                </div>
                <div className={cx('total-price')}>
                  총가격: {eachItemTotalPrice}원
                </div>
                <div className={cx('buttons')}>
                <Button theme="outline" onClick={addCartList}>장바구니 담기</Button>
                  <Button theme="outline" onClick={handlePay}>결제하기</Button>
                </div>
              </div>
              
            </div>
            <div className={cx('header-description')}>
                상품 상세 정보
            </div>
            <div className={cx('item-description')}>
              <div className={cx('image-wrapper')}>
                {
                  imageList
                }
              </div>
              <div className={cx('descriptions')}>
                {
                  body
                }
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}


export default withRouter(DetailItem);
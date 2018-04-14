import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
// action types
const GET_CART_LIST = 'cart/GET_CART_LIST';
const REMOVE_CART_LIST = 'cart/REMOVE_CART_LIST';
const REMOVE_CART_BY_ID = 'cart/REMOVE_CART_BY_ID';
const ADD_CART_LIST = 'cart/ADD_CART_LIST';
const CHANGE_AMOUNT = 'cart/CHANGE_AMOUNT';
const CHANGE_TOTAL_PRICE = 'cart/CHANGE_TOTAL_PRICE';
const INITIALIZE_EACH_ITEM_TOTAL_PRICE = 'cart/INITIALIZE_EACH_ITEM_TOTAL_PRICE';
const RESET_CART_LOG = 'cart/RESET_CART_LOG';
const INITIALIZE = 'cart/INITIALIZE';
const CHANGE_BY_SELECTION = 'cart/CHANGE_BY_SELECTION';
const CHANGE_AMOUNT_ON_CART_PAGE = 'cart/CHANGE_AMOUNT_ON_CART_PAGE';
// action creator
export const getCartList = createAction(GET_CART_LIST);
export const removeCartList = createAction(REMOVE_CART_LIST, api.removeCartList);
export const removeCartById = createAction(REMOVE_CART_BY_ID);
export const addCartList = createAction(ADD_CART_LIST);
export const changeAmount = createAction(CHANGE_AMOUNT);
export const changeTotalPrice = createAction(CHANGE_TOTAL_PRICE);
export const initializeEachItemTotalPrice = createAction(INITIALIZE_EACH_ITEM_TOTAL_PRICE);
export const resetCartLog = createAction(RESET_CART_LOG);
export const initialize = createAction(INITIALIZE);
export const changeBySelection = createAction(CHANGE_BY_SELECTION);
export const changeAmountOnCartPage = createAction(CHANGE_AMOUNT_ON_CART_PAGE);

// initial state
const initialState = Map({
    cartList: List(),
    totalPrice: 0,
    totalAmount: 0,
    amount: 1,
    thumbnailImage: '',
    eachItemTotalPrice: 0,
    cartLog: '',
    error: Map({
        errorCode: '',
        errorLog: ''
    }),
    selected: false,
    selectedPrice: 0
});

// reducer
export default handleActions({
    [GET_CART_LIST]: (state, action) => {
        console.log(action.payload);
        const { cartList, totalPrice } = action.payload;
        return state.set('cartList', fromJS(cartList))
                    .set('totalPrice', totalPrice);

    },  
    // ...pender({
    //     type: GET_CART_LIST,
    //     onSuccess: (state, action) => {
    //         // console.log(state.get('cartList').size <= 0);
    //         // if(state.get('cartList').size <= 0) {
    //         //     return state.set('cartList', false);
    //         // }
    //         const { cartList, cartTotalPrice } = action.payload.data;
    //         console.log(action.payload.data);
    //         // let totalPrice = 0;
    //         // const totalAmount = cartList.map(
    //         //     (cart, i) => {
    //         //         let amount = 0;
    //         //         amount += parseInt(cart.totalPrice, 10);
    //         //         return amount;
    //         //     }    
    //         // );
    //         // for(let eachTotalPrice of totalAmount) {
    //         //     totalPrice += eachTotalPrice;
    //         // }
    //         // if(cartList === {}) {
    //         //     return state.set('cartList', false);
    //         // }
    //         // if(cartList.length <= 0) {
    //         //     return state.set('cartList', false);
    //         // }
    //         return state
    //                     .set('cartList', fromJS(cartList))
    //                     .set('totalPrice', cartTotalPrice);
            
    //         // if(cartList.toString() === "0/0") {
    //         //     return state.set('cartList', false);
    //         // }

    //         // if(cartList) {
    //         //     return state.set('cartList', fromJS(cartList))
    //         //     .set('totalPrice', cartList[cartList.length - 1].split("/")[1])
    //         //     .set('totalAmount', cartList[cartList.length - 1].split("/")[0]);
    //         // }

    //         // return state.set('cartList', false)
    //         //             .set('totalPrice', 0)
    //         //             .set('totalAmount', 0);


            
    //     }
    // }),
    ...pender({
        type: REMOVE_CART_LIST,
        onSuccess: (state, action) => {
            return state.set('cartList', false)
                        .set('totalPrice', 0)
                        .set('totalAmount', 0);
        }
    }),
    [REMOVE_CART_BY_ID]: (state, action) => {   
        const cartList = state.get('cartList').toJS();
        delete cartList[action.payload];
        return state.set('cartList', fromJS(cartList));
        // console.log(state.get('cartList').toJS());
    }, 
    // ...pender({
    //     type: REMOVE_CART_BY_ID,
    //     onSuccess: (state, action) => {
    //        const { data: cartList } = action.payload;
    //        if(cartList === 0) {
    //         return state.set('cartList', initialState.get('cartList'));
    //        }
    //        return state.set('cartList', fromJS(cartList))
    //     //    if(size === 0) {
    //     //     return state.set('cartList', initialState.get('cartList'));
    //     //    } else {

    //     //    }
    //         // const { data: id } = action.payload;
    //         // const updatedCartList = state.get('cartList').delete(id);
    //         // if(updatedCartList.size === 1) {
    //         //    return state.set('cartList', false)
    //         //                 .set('totalPrice', 0)
    //         //                 .set('totalAmount', 0);
    //         // }
    //         // return state.set('cartList', updatedCartList);
    //     }
    // }),
    // [ADD_CART_LIST]: (state, action) => {
    //     const { cart } = action.payload;
    //     return state.set('cartList', cart);
    // },
    // ...pender({
    //     type: ADD_CART_LIST,
    //     onSuccess: (state, action) => {
    //         const { cartLog } = action.payload.data;
    //         return state.set('cartLog', cartLog);
    //     },
    //     onError: (state, action) => {
    //         const { errorCode, errorLog } = action.payload.response.data;
    //         return state.setIn(['error', 'errorCode'], errorCode)
    //                     .setIn(['error', 'errorLog'], errorLog)
    //                     .set('amount', 1);

    //     }
    // }),
    [CHANGE_AMOUNT]: (state, action) => {
        const { value, price } = action.payload;

        if(state.get('selected')) {
            if(parseInt(value, 10) <= 0 || value === "") {
                return state.set('amount', value)
                            .set('eachItemTotalPrice', 1 * parseInt(state.get('selectedPrice'), 10));
            }
    
            return state.set('amount', value)
                        .set('eachItemTotalPrice', parseInt(value, 10) * parseInt(state.get('selectedPrice'), 10));
        } else {
            if(parseInt(value, 10) <= 0 || value === "") {
                return state.set('amount', value)
                            .set('eachItemTotalPrice', 1 * parseInt(price, 10));
            }
    
            return state.set('amount', value)
                        .set('eachItemTotalPrice', parseInt(value, 10) * parseInt(price, 10));
        }

        
    },
    [CHANGE_TOTAL_PRICE]: (state, action) => {
        const { amount, price } = action.payload;
        return state.set('eachItemTotalPrice', parseInt(amount, 10) * parseInt(price, 10));
    },
    [INITIALIZE_EACH_ITEM_TOTAL_PRICE]: (state, action) => {
        const { eachItemPrice } = action.payload;

        return state.set('eachItemTotalPrice', eachItemPrice);
    },
    [RESET_CART_LOG]: (state, action) => {
        return state.set('cartLog', initialState.get('cartLog'))
                    .set('error', initialState.get('error'));
    },
    [INITIALIZE]: (state, action) => {
        return state.set('amount', 1);
    },
    [CHANGE_BY_SELECTION]: (state, action) => {
        const { price } = action.payload;
        return state.set('eachItemTotalPrice', parseInt(price, 10))
                    .set('selected', true)
                    .set('selectedPrice', parseInt(price, 10));
    },
    [CHANGE_AMOUNT_ON_CART_PAGE]: (state, action) => {
        
    }
}, initialState);
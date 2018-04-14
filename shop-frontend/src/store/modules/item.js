import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as api from 'lib/api';
import { pender } from 'redux-pender';

// action types
const GET_ITEM_LIST = 'item/GET_ITEM_LIST';
const GET_ITEM_BY_ID = 'item/GET_ITEM_BY_ID';
const CHANGE_PRICE_BY_SELECTION = 'item/CHANGE_PRICE_BY_SELECTION';
const REMOVE_ITEM_BY_ID = 'item/REMOVE_ITEM_BY_ID';
const UPDATE_ITEM_BY_ID = 'item/UPDATE_ITEM_BY_ID';

// action creator
export const getItemList = createAction(GET_ITEM_LIST, api.getItemList);
export const getItemById = createAction(GET_ITEM_BY_ID, api.getItemById);
export const changePriceBySelection = createAction(CHANGE_PRICE_BY_SELECTION);
export const removeItemById = createAction(REMOVE_ITEM_BY_ID, api.removeItemById);
export const updateItemById = createAction(UPDATE_ITEM_BY_ID, api.updateItemById);

// initial state
const initialState = Map({
    items: List(), 
    item: Map({
        id: '', 
        title: '',
        body: '',
        price:'',
        imageNames: '',
        publishedDate: ''
    })   
});

// reducer
export default handleActions({
    ...pender({
        type: GET_ITEM_LIST,
        onSuccess: (state, action) => {
            const { data: itemList } = action.payload;
            
            return state.set('items', fromJS(itemList));
        }
    }),
    ...pender({
        type: GET_ITEM_BY_ID,
        onSuccess: (state, action) => {
            const { data: item } = action.payload;
            return state.setIn(['item', 'id'], item.id)
                        .setIn(['item', 'title'], item.title)
                        .setIn(['item', 'body'], item.body)
                        .setIn(['item', 'price'], item.price)
                        .setIn(['item', 'imageNames'], item.imageNames)
                        .setIn(['item', 'publishedDate'], item.publishedDate);
        }
    }),
    [CHANGE_PRICE_BY_SELECTION]: (state, action) => {
        console.log(action.payload);
        const { price } = action.payload;
        
        return state.setIn(['item', 'price'], price);
    }
}, initialState);
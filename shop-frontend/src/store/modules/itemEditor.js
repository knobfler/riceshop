import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const CHANGE_INPUT = 'itemEditor/CHANGE_INPUT';
const INITIALIZE = 'itemEditor/INITIALIZE';
const GET_ITEM_BY_ID = 'itemEditor/GET_ITEM_BY_ID';
// action creator
export const changeInput = createAction(CHANGE_INPUT);
export const initialize = createAction(INITIALIZE);
export const getItemById = createAction(GET_ITEM_BY_ID, api.getItemById);

// initial state
const initialState = Map({
    title: '',
    markdown: '',
    price: '',
    itemId: '',
    imageNames: '',
    publishedDate: ''
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: GET_ITEM_BY_ID,
        onSuccess: (state, action) => {
            const { data: item } = action.payload;
            return state.set('itemId', item.id)
                        .set('title', item.title)
                        .set('markdown', item.body)
                        .set('price', item.price)
                        .set('imageNames', item.imageNames)
                        .set('publishedDate', item.publishedDate);
        }
    })
}, initialState);
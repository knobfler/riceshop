import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const GET_ALERT_ITEM_LIST = 'alert/GET_ALERT_ITEM_LIST';
const READ_ALERT_ITEM = 'alert/READ_ALERT_ITEM';

// action creator
export const getAlertItemList = createAction(GET_ALERT_ITEM_LIST, api.getAlertItemList);
export const readAlertItem = createAction(READ_ALERT_ITEM, api.readAlertItem);


// initial state
const initialState = Map({
    alerts: List(),
    lastPage: null,
    alert: Map({})
});

// reducer
export default handleActions({
    ...pender({
        type: GET_ALERT_ITEM_LIST,
        onSuccess: (state, action) => {
            const { data: alerts } = action.payload;
            const lastPage = action.payload.headers['last-page'];
            return state.set('alerts', fromJS(alerts))
                        .set('lastPage', lastPage);
        }
    }),
    ...pender({
        type: READ_ALERT_ITEM,
        onSuccess: (state, action) => {
            const { data: alert } = action.payload;
            return state.set('alert', fromJS(alert));
        }
    })
}, initialState);
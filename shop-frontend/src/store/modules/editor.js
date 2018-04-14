import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const WRITE_ALERT_ITEM = 'editor/WRITE_ALERT_ITEM';
const SET_ERROR = 'editor/SET_ERROR';
const GET_ALERT_ITEM = 'editor/GET_ALERT_ITEM';
const EDIT_ALERT_ITEM = 'editor/EDIT_ALERT_ITEM';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writeAlertItem = createAction(WRITE_ALERT_ITEM, api.writeAlertItem);
export const setError = createAction(SET_ERROR);
export const getAlertItem = createAction(GET_ALERT_ITEM, api.readAlertItem);
export const editAlertItem = createAction(EDIT_ALERT_ITEM, api.updateAlertItem);


// initial state
const initialState = Map({
  title: '',
  markdown: '',
  alertId: null,
  error: false
});

// reducer
export default handleActions({
  [INITIALIZE]: (state, action) => initialState,
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.set(name, value);
  },
  ...pender({
    type: WRITE_ALERT_ITEM,
    onSuccess: (state, action) => {
      const { _id } = action.payload.data;
      return state.set('alertId', _id);
    },
    onError: (state, action) => {
      return state.set('error', true);
    }
  }),
  [SET_ERROR]: (state, action) => {
    return state.set('error', false);
  },
  ...pender({
    type: GET_ALERT_ITEM,
    onSuccess: (state, action) => {
      const { data: alert } = action.payload;
      return state.set('title', alert.title)
                  .set('markdown', alert.body);
    }
  }),
  ...pender({
    type: EDIT_ALERT_ITEM,
    onError: (state, action) => {
      return state.set('error', true);
    }
  })
}, initialState)
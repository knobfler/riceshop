import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
// action types
const CHANGE_INPUT = 'login/CHANGE_INPUT';
const RESET_ERRORS = 'login/RESET_ERRORS';

// action creator
export const changeInput = createAction(CHANGE_INPUT);
export const resetErrors = createAction(RESET_ERRORS);

// initial state
const initialState = Map({
});

// reducer
export default handleActions({
    
}, initialState);
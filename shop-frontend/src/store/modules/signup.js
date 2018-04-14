import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const INITIALIZE = 'signup/INITIALIZE';
const CHANGE_INPUT = 'signup/CHANGE_INPUT';
const INSERT_DAUM_ADDRESS = 'signup/INSERT_DAUM_ADDRESS';
const SIGNUP = 'signup/SIGNUP';
const CHECK_ID = 'signup/CHECK_ID';
const RESET_ERRORS = 'signup/RESET_ERRORS';
const RESET_MESSAGE = 'signup/RESET_MESSAGE';

// action creator
export const changeInput = createAction(CHANGE_INPUT);
export const insertDaumAddress = createAction(INSERT_DAUM_ADDRESS);
export const signup = createAction(SIGNUP, api.signup);
export const checkid = createAction(CHECK_ID, api.checkid);
export const resetErrors = createAction(RESET_ERRORS);
export const resetMessage = createAction(RESET_MESSAGE);
export const initialize = createAction(INITIALIZE);

// initial state
const initialState = Map({
    userID: '',
    userName: '',
    userEmail: '',
    userPassword: '',
    userPasswordCheck: '',
    userPostAddress: '',
    userPostCode: '',
    userDetailAddress: '',
    error: Map({
        errorCode: '',
        errorLog: ''
    }),
    checkIdSuccessMessage: ''
});

// reducer
export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { value, name } = action.payload;
        return state.set(name, value);
    },
    [INSERT_DAUM_ADDRESS]: (state, action) => {
        const { value, name } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: SIGNUP,
        // onSuccess: (state, action) => {
            
        // },
        onError: (state, action) => {
            const { errorCode, errorLog } = action.payload.response.data;
            return state.setIn(['error', 'errorCode'], errorCode)
                        .setIn(['error', 'errorLog'], errorLog);
        }
    }),
    ...pender({
        type: CHECK_ID,
        onSuccess: (state, action) => {
            return state.set('checkIdSuccessMessage', '사용가능한 아이디입니다.');
        },
        onError: (state, action) => {
            const { errorCode, errorLog } = action.payload.response.data;
            return state.setIn(['error', 'errorCode'], errorCode)
                        .setIn(['error', 'errorLog'], errorLog);
        }
    }),
    [RESET_ERRORS]: (state, action) => {
        return state.setIn(['error', 'errorCode'], '')
                    .setIn(['error', 'errorLog'], '');
    },
    [RESET_MESSAGE]: (state, action) => {
        return state.set('checkIdSuccessMessage', '');
    },
    [INITIALIZE]: (state, action) => initialState
}, initialState);
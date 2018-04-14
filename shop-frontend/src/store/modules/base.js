import {createAction, handleActions} from 'redux-actions';

import {Map} from 'immutable';
import {pender} from 'redux-pender';
import * as api from 'lib/api';

// action types
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';
const ADMIN_LOGIN = 'base/ADMIN_LOGIN';
const MEMBER_LOGIN = 'base/MEMBER_LOGIN';
const CHECK_ADMIN_LOGIN = 'base/CHECK_ADMIN_LOGIN';
const CHECK_MEMBER_LOGIN = 'base/CHECK_MEMBER_LOGIN';
const CHANGE_PASSWORD_INPUT = 'base/CHANGE_PASSWORD_INPUT';
const INITIALIZE_LOGIN_MODAL = 'base/INITIALIZE_LOGIN_MODAL';
const ADMIN_LOGOUT = 'base/ADMIN_LOGOUT';
const MEMBER_LOGOUT = 'base/MEMBER_LOGOUT';
const TEMP_LOGIN = 'base/TEMP_LOGIN';
const MEMBER_TEMP_LOGIN = 'base/MEMBER_TEMP_LOGIN';
const REMOVE_ALERT_ITEM = 'alert/REMOVE_ALERT_ITEM';

const SHOW_SIDEBAR = 'base/SHOW_SIDEBAR';
const HIDE_SIDEBAR = 'base/HIDE_SIDEBAR';

const CHANGE_INPUT = 'base/CHANGE_INPUT';
const RESET_ERRORS = 'base/RESET_ERRORS';

// action creators
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const adminLogin = createAction(ADMIN_LOGIN, api.adminLogin);
export const memberLogin = createAction(MEMBER_LOGIN, api.memberLogin);
export const checkAdminLogin = createAction(CHECK_ADMIN_LOGIN, api.checkAdminLogin);
export const checkMemberLogin = createAction(CHECK_MEMBER_LOGIN, api.checkMemberLogin);
export const changePasswordInput = createAction(CHANGE_PASSWORD_INPUT);
export const initializeLoginModal = createAction(INITIALIZE_LOGIN_MODAL);
export const adminLogout = createAction(ADMIN_LOGOUT, api.adminLogout);
export const memberLogout = createAction(MEMBER_LOGOUT, api.memberLogout);
export const tempLogin = createAction(TEMP_LOGIN);
export const memberTempLogin = createAction(MEMBER_TEMP_LOGIN);
export const removeAlertItem = createAction(REMOVE_ALERT_ITEM, api.removeAlertItem);
export const showSidebar = createAction(SHOW_SIDEBAR);
export const hideSidebar = createAction(HIDE_SIDEBAR);
export const changeInput = createAction(CHANGE_INPUT);
export const resetErrors = createAction(RESET_ERRORS);

// initial state

const initialState = Map({
    modal: Map({login: false, remove: false}),
    loginModal: Map({password: '', error: false}),
    logged: false,
    sidebarVisible: false,
    memberLogged: false,
    userID: '',
    userPassword: '',
    error: Map({
        errorCode: '',
        errorLog: ''
    })
});

// reducer
export default handleActions({
    [SHOW_MODAL]: (state, action) => {
        const {payload: modalName} = action;
        return state.setIn([
            'modal', modalName
        ], true);
    },
    [HIDE_MODAL]: (state, action) => {
        const {payload: modalName} = action;
        return state.setIn([
            'modal', modalName
        ], false);
    },
    ...pender({
        type: ADMIN_LOGIN,
        onSuccess: (state, action) => {
            return state.set('logged', true);
        },
        onError: (state, action) => {
            return state.setIn([
                'loginModal', 'password'
            ], '').setIn([
                'loginModal', 'error'
            ], true);
        }
    }),
    [CHANGE_INPUT]: (state, action) => {
        const { value, name } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: MEMBER_LOGIN,
        onSuccess: (state, action) => {
            return state.set('memberLogged', true);
        },
        onError: (state, action) => {
            const { errorCode, errorLog } = action.payload.response.data;
            return state.setIn(['error', 'errorCode'], errorCode)
                        .setIn(['error', 'errorLog'], errorLog);
        }
    }),
    [RESET_ERRORS]: (state, action) => {
        return state.set('error', initialState.get('error'));
    },
    ...pender({
        type: CHECK_ADMIN_LOGIN,
        onSuccess: (state, action) => {
            const { logged } = action.payload.data;
            return state.set('logged', logged);
        }
    }),
    ...pender({
        type: CHECK_MEMBER_LOGIN,
        onSuccess: (state, action) => {
            // console.log(action.payload.data);
            const {data: isMemberLogged} = action.payload;
            return state.set('memberLogged', isMemberLogged);
        }
    }),
    [CHANGE_PASSWORD_INPUT]: (state, action) => {
        const {payload: password} = action;
        return state.setIn([
            'loginModal', 'password'
        ], password);
    },
    [INITIALIZE_LOGIN_MODAL]: (state, action) => {
        return state.set('loginModal', initialState.get('loginModal'));
    },
    [TEMP_LOGIN]: (state, action) => {
        return state.set('logged', true);
    },
    [MEMBER_TEMP_LOGIN]: (state, action) => {
        return state.set('memberLogged', true);
    },
    [SHOW_SIDEBAR]: (state, action) => {
        return state.set('sidebarVisible', true);
    },
    [HIDE_SIDEBAR]: (state, action) => {
        return state.set('sidebarVisible', false);
    }
}, initialState)
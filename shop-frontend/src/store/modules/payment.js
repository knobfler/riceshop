import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const GET_USER_INFO = 'payment/GET_USER_INFO';
const CHANGE_INPUT = 'payment/CHANGE_INPUT';

// action creator
export const getUserInfo = createAction(GET_USER_INFO, api.getUserInfo);
export const changeInput = createAction(CHANGE_INPUT);

// initial state
const initialState = Map({
    info: Map({}),
    userinfoPhonePost: '',
    userinfoPhoneRear: '',
    userinfoSecondPhonePost: '',
    userinfoSecondPhoneRear: '',
    userinfoPostCode: '',
    userinfoName: '',
    userID: '',
    userinfoEmail: '',
    userinfoAddress: '',
    userinfoDetailAddress: '',
    userRequestMessage: ''
});

// reducer
export default handleActions({
    ...pender({
        type: GET_USER_INFO,
        onSuccess: (state, action) => {
            const { account: userinfo } = action.payload.data;
            // console.log(userinfo);
            return state.set('userinfoName', userinfo.userName)
                        .set('userID', userinfo.userID)
                        .set('userinfoEmail', userinfo.userEmail)
                        .set('userinfoAddress', userinfo.userPostAddress)
                        .set('userinfoPostCode', userinfo.userPostCode)
                        .set('userinfoDetailAddress', userinfo.userDetailAddress);

        }
    }),
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    }
}, initialState);
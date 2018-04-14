import axios from 'axios';
import queryString from 'query-string';

// Auth
export const adminLogin = (password) => axios.post(`/api/auth/login/admin`, {password});
export const checkAdminLogin = () => axios.get(`/api/auth/check/admin`);
export const adminLogout = () => axios.post(`/api/auth/logout/admin`);

// Auth (member)
export const signup = ({userID, userName, userEmail, userPassword, userPasswordCheck, userPostAddress, userPostCode, userDetailAddress}) => axios.post(`/api/member`, {userID, userName, userEmail, userPassword, userPasswordCheck, userPostAddress, userPostCode, userDetailAddress});
export const checkid = ({userID}) => axios.post(`/api/member/checkid`, {userID});
export const checkMemberLogin = ({userID}) => axios.post(`/api/member/login/check`, {userID});
export const memberLogin = ({userID, userPassword}) => axios.post(`/api/member/login`, {userID, userPassword});
export const memberLogout = ({userID}) => axios.post(`/api/member/logout`, {userID});
// Alert
export const getAlertItemList = ({page}) => axios.get(`/api/post/alert/?${queryString.stringify({page})}`);
export const writeAlertItem = ({title, body}) => axios.post(`/api/post/alert`, {title, body});
export const readAlertItem = (id) => axios.get(`/api/post/alert/${id}`);
export const updateAlertItem = ({id, title, body}) => axios.patch(`/api/post/alert/${id}`, {title, body});

// Editor
// export const getAlertItem = (id)

// Base
export const removeAlertItem = (id) => axios.delete(`/api/post/alert/${id}`);

// item
export const getItemList = () => axios.get(`/api/item`);
export const getItemById = (id) => axios.get(`/api/item/${id}`);
export const removeItemById = (itemId) => axios.delete(`/api/item/${itemId}`);
export const updateItemById = ({itemId, title, body, price, imageNames}) => axios.patch(`/api/item/${itemId}`, {title, body, price, imageNames});

// Cart
export const getCartList = () => axios.get(`/api/cart`);
export const removeCartList = () => axios.delete(`/api/cart`);
export const removeCartById = (id) => axios.delete(`/api/cart/${id}`);
export const addCartList = ({id, title, amount, thumbnailImage, totalPrice}) => axios.post(`/api/cart`, {id, title, amount, thumbnailImage, totalPrice});

// payment
export const getUserInfo = ({userID}) => axios.post(`/api/member/info`, {userID});
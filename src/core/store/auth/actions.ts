import * as types from './types';

//Action Creators
export const loginUser = (): types.ILOGIN_USER => ({
    type: 'LOGIN_USER',
});
export const logoutUser = (): types.ILOGOUT_USER => ({ type: 'LOGOUT_USER' });

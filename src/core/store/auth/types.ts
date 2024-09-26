//Action Types
export interface ILOGIN_USER {
    type: 'LOGIN_USER';
}

export interface ILOGOUT_USER {
    type: 'LOGOUT_USER';
}

export type ActionType = ILOGIN_USER | ILOGOUT_USER;

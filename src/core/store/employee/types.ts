import { IApiEmployee } from '../../../interfaces/ApiDataInterface';

//Action Types
export interface IFETCH_EMPLOYEE_SUCCESS {
    type: 'FETCH_EMPLOYEE_SUCCESS';
    payload: IApiEmployee;
}

export interface ICLEAR_EMPLOYEE_DATA {
    type: 'CLEAR_EMPLOYEE_DATA';
}

export type ActionType = IFETCH_EMPLOYEE_SUCCESS | ICLEAR_EMPLOYEE_DATA;

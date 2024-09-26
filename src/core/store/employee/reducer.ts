import { RootState } from '..';
import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { modifyFetchedEmployeeData } from '../../../utils';
import { ActionType } from './types';
import { createSelector } from 'reselect';

interface IEmployeeState {
    employeeData: IApiEmployee | null;
}

const initialState: IEmployeeState = {
    employeeData: null,
};

const employeeReducer = (
    state = initialState,
    action: ActionType
): IEmployeeState => {
    switch (action.type) {
        case 'FETCH_EMPLOYEE_SUCCESS':
            return {
                ...state,
                employeeData: action.payload,
            };
        case 'CLEAR_EMPLOYEE_DATA':
            return {
                ...state,
                employeeData: null,
            };
        default:
            return state;
    }
};

export const selectEmployeeDetails = createSelector(
    (state: RootState) => state.employee.employeeData,
    (employeeData) => {
        if (employeeData) {
            return modifyFetchedEmployeeData(employeeData);
        } else {
            return null;
        }
    }
);

export default employeeReducer;

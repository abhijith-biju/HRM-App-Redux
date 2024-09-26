import { createSelector } from 'reselect';
import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { ActionType } from './types';
import { RootState } from '..';
import { fillEmptySlotsWithValue } from '../../../utils';

interface IEmployeesState {
    employeesList: (IApiEmployee[] | null)[];
    count: number | undefined;
}

const initialState: IEmployeesState = {
    count: undefined,
    employeesList: [],
};

const employeesReducer = (
    state = initialState,
    action: ActionType
): IEmployeesState => {
    switch (action.type) {
        case 'FETCH_EMPLOYEES_SUCCESS':
            const updatedEmployeesList = [...state.employeesList];
            const { offset, limit, response } = action.payload;

            const rowIndex = Math.floor(offset / limit);
            updatedEmployeesList[rowIndex] = response.employees;

            return {
                ...state,
                count: response.count,
                employeesList: fillEmptySlotsWithValue(
                    updatedEmployeesList,
                    null
                ),
            };
        case 'EMPLOYEE_LIST_CLEAR':
            return {
                ...state,
                count: undefined,
                employeesList: [],
            };
        default:
            return state;
    }
};

export const selectEmployeesListSlice = (offset: number, limit: number) =>
    createSelector(
        (state: RootState) => state.employees.employeesList,
        (employeesList) => {
            const employeeSlice = employeesList[Math.floor(offset / limit)];
            if (employeeSlice) {
                return employeeSlice;
            }
            return [];
        }
    );

export const selectEmployeesList = createSelector(
    (state: RootState) => state.employees.employeesList,
    (employeesList) => employeesList.flat()
);

export default employeesReducer;

import {
    IApiEmployeeSubmission,
    IApiEmployeesData,
} from '../../../interfaces/ApiDataInterface';
import * as types from './types';
import { toast } from 'react-toastify';
import {
    getEmployeesList,
    deleteEmployee,
    addEmployee,
    editEmployee,
} from '../../api';
import { AppDispatch, AppThunk } from '..';
import { requestHelper } from '../requests/actions';
import { REQUESTS_ENUM } from '../requests/requestsEnum';
import { ISearchParams } from '../../../interfaces/common';
import { clearEmployeeData } from '../employee/actions';

//Action Creators
//EMPLOYEES LIST FETCH
const fetchEmployeesSuccess = (
    employeesData: IApiEmployeesData,
    offset: number,
    limit: number
): types.IFETCH_EMPLOYEES_SUCCESS => ({
    type: 'FETCH_EMPLOYEES_SUCCESS',
    payload: {
        response: employeesData,
        offset,
        limit,
    },
});

//Thunk Action creator
export const fetchEmployees = (searchParams: ISearchParams): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await requestHelper(
                dispatch,
                REQUESTS_ENUM.getEmployeesList,
                () => getEmployeesList(searchParams)
            );
            dispatch(
                fetchEmployeesSuccess(
                    data.data,
                    searchParams.offset,
                    searchParams.limit
                )
            );
        } catch (error) {
            console.log(error);
            toast.error(
                'Could not fetch employee details. Please try reloading the page.'
            );
        }
    };
};

//thunk action creator
export const deleteEmployeeAction = (
    empIdToDelete: number,
    searchParams: ISearchParams
): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            await requestHelper(dispatch, REQUESTS_ENUM.deleteEmployee, () =>
                deleteEmployee(empIdToDelete)
            );

            dispatch(fetchEmployees(searchParams));
            toast.success('Employee deleted Successfully');
        } catch (error) {
            console.log(error);
            toast.error('Employee deletion failed');
        }
    };
};

// EMPLOYEE ADD
//thunk function
export const addEmployeeAction = (
    apiSubmissionData: IApiEmployeeSubmission
): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await requestHelper(
                dispatch,
                REQUESTS_ENUM.addEmployee,
                () => addEmployee(apiSubmissionData)
            );
            dispatch(employeeListClear());
            toast.success('Employee details added successfully.');
            return data.data.id;
        } catch (error) {
            console.log(error);
            toast.error('Could not add employee details. Please try again.');
        }
    };
};

// EMPLOYEE EDIT
//thunk function
export const editEmployeeAction = (
    employeeId: number,
    apiSubmissionData: IApiEmployeeSubmission
): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await requestHelper(
                dispatch,
                REQUESTS_ENUM.editEmployee,
                () => editEmployee(employeeId, apiSubmissionData)
            );
            dispatch(employeeListClear());
            dispatch(clearEmployeeData());
            toast.success('Employee details edited successfully.');
            return data.data.id;
        } catch (error) {
            console.log(error);
            toast.error('Could not edit employee details. Please try again.');
        }
    };
};

//EMPLOYEE LIST CLEAR
export const employeeListClear = (): types.IEMPLOYEE_LIST_CLEAR => ({
    type: 'EMPLOYEE_LIST_CLEAR',
});

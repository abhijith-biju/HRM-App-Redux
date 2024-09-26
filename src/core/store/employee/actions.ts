import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import * as types from './types';
import { toast } from 'react-toastify';
import { AppDispatch, AppThunk, RootState } from '..';
import { getEmployee } from '../../api';
import { requestHelper } from '../requests/actions';
import { REQUESTS_ENUM } from '../requests/requestsEnum';
import { EmptyResponseDataError } from '../../../utils/errors';

//Action Creators
export const fetchEmployeeSuccess = (
    employeeData: IApiEmployee
): types.IFETCH_EMPLOYEE_SUCCESS => ({
    type: 'FETCH_EMPLOYEE_SUCCESS',
    payload: employeeData,
});

export const fetchEmployee = (employeeId: number): AppThunk => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const employeeInStore = getState().employee.employeeData;

        try {
            if (!employeeInStore || employeeInStore.id !== employeeId) {
                const { data: response } = await requestHelper(
                    dispatch,
                    REQUESTS_ENUM.getEmployee,
                    async () => {
                        const response = await getEmployee(employeeId);
                        if (!response.data.data) {
                            throw new EmptyResponseDataError(
                                'No data in response'
                            );
                        }
                        return response;
                    }
                );
                dispatch(fetchEmployeeSuccess(response.data));
            } else {
                dispatch(fetchEmployeeSuccess(employeeInStore));
            }
        } catch (error) {
            console.log(error);
            if (error instanceof EmptyResponseDataError) {
                toast.error('Could not find the requested employee.');
            } else {
                toast.error(
                    'Could not fetch employee details. Please try reloading the page.'
                );
            }
        }
    };
};

export const clearEmployeeData = (): types.ICLEAR_EMPLOYEE_DATA => {
    return {
        type: 'CLEAR_EMPLOYEE_DATA',
    };
};

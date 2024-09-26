import { IApiDepartment } from '../../../../interfaces/ApiDataInterface';
import * as types from './types';
import { AppDispatch, AppThunk } from '../..';
import { toast } from 'react-toastify';
import { getDepartments } from '../../../api';
import { requestHelper } from '../../requests/actions';
import { REQUESTS_ENUM } from '../../requests/requestsEnum';

// Action Creators
export const fetchDepartmentsSuccess = (
    departmentsData: IApiDepartment[]
): types.IFETCH_DEPARTMENTS_SUCCESS => ({
    type: 'FETCH_DEPARTMENTS_SUCCESS',
    payload: departmentsData,
});

// Thunk Action
export const fetchDepartments = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await requestHelper(
                dispatch,
                REQUESTS_ENUM.getDepartments,
                getDepartments
            );
            dispatch(fetchDepartmentsSuccess(data));
        } catch (error) {
            console.log(error);
            toast.error(
                'Could not fetch departments list. Please try reloading the page.'
            );
        }
    };
};

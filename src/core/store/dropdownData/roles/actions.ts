import { IApiRole } from '../../../../interfaces/ApiDataInterface';
import * as types from './types';
import { toast } from 'react-toastify';
import { getRoles } from '../../../api';
import { AppDispatch, AppThunk } from '../..';
import { requestHelper } from '../../requests/actions';
import { REQUESTS_ENUM } from '../../requests/requestsEnum';

// Action Creators
export const fetchRolesSuccess = (
    rolesData: IApiRole[]
): types.IFETCH_ROLES_SUCCESS => ({
    type: 'FETCH_ROLES_SUCCESS',
    payload: rolesData,
});

// Thunk Action
export const fetchRoles = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await requestHelper(
                dispatch,
                REQUESTS_ENUM.getRoles,
                getRoles
            );
            dispatch(fetchRolesSuccess(data));
        } catch (error) {
            console.log(error);
            toast.error(
                'Could not fetch roles list. Please try reloading the page.'
            );
        }
    };
};

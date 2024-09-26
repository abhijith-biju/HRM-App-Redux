import { IApiSkill } from '../../../../interfaces/ApiDataInterface';
import * as types from './types';
import { toast } from 'react-toastify';
import { getSkills } from '../../../api';
import { AppDispatch, AppThunk } from '../..';
import { requestHelper } from '../../requests/actions';
import { REQUESTS_ENUM } from '../../requests/requestsEnum';

//Action Creators

//SKILLS FETCH
export const fetchSkillsSuccess = (
    employeesData: IApiSkill[]
): types.IFETCH_SKILLS_SUCCESS => ({
    type: 'FETCH_SKILLS_SUCCESS',
    payload: employeesData,
});

//Thunk Action
export const fetchSkills = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data: fetchResponse } = await requestHelper(
                dispatch,
                REQUESTS_ENUM.getSkills,
                getSkills
            );
            dispatch(fetchSkillsSuccess(fetchResponse.data));
        } catch (error) {
            console.log(error);
            toast.error(
                'Could not fetch skills list. Please try reloading the page.'
            );
        }
    };
};

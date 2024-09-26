import { ActionType } from './types';
import { IReactSelectOption } from '../../../../interfaces/common';
import { modifySelectOptionsArray } from '../../../../utils';

interface IDepartmentsState {
    departmentsData: IReactSelectOption[];
}

const initialState: IDepartmentsState = {
    departmentsData: [],
};

const departmentsReducer = (
    state = initialState,
    action: ActionType
): IDepartmentsState => {
    switch (action.type) {
        case 'FETCH_DEPARTMENTS_SUCCESS':
            return {
                ...state,
                departmentsData: modifySelectOptionsArray(
                    action.payload,
                    'department'
                ),
            };
        default:
            return state;
    }
};

export default departmentsReducer;

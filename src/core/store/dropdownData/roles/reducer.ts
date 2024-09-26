import { ActionType } from './types';
import { IReactSelectOption } from '../../../../interfaces/common';
import { modifySelectOptionsArray } from '../../../../utils';

interface IRolesState {
    rolesData: IReactSelectOption[];
}

const initialState: IRolesState = {
    rolesData: [],
};

const rolesReducer = (
    state = initialState,
    action: ActionType
): IRolesState => {
    switch (action.type) {
        case 'FETCH_ROLES_SUCCESS':
            return {
                ...state,
                rolesData: modifySelectOptionsArray(action.payload, 'role'),
            };
        default:
            return state;
    }
};

export default rolesReducer;

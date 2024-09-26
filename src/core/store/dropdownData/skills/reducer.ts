import { ActionType } from './types';
import { IReactSelectOption } from '../../../../interfaces/common';
import { modifySelectOptionsArray } from '../../../../utils';

interface ISkillsState {
    skillsData: IReactSelectOption[];
}

const initialState: ISkillsState = {
    skillsData: [],
};

const skillsReducer = (
    state = initialState,
    action: ActionType
): ISkillsState => {
    switch (action.type) {
        case 'FETCH_SKILLS_SUCCESS':
            return {
                ...state,
                skillsData: modifySelectOptionsArray(action.payload, 'skill'),
            };

        default:
            return state;
    }
};

export default skillsReducer;

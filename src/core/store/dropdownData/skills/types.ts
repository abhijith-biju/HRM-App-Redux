import { IApiSkill } from '../../../../interfaces/ApiDataInterface';

//Actions definitions
export interface IFETCH_SKILLS_SUCCESS {
    type: 'FETCH_SKILLS_SUCCESS';
    payload: IApiSkill[];
}

export type ActionType = IFETCH_SKILLS_SUCCESS;

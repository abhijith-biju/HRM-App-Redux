import { IApiRole } from '../../../../interfaces/ApiDataInterface';

// Actions definitions
export interface IFETCH_ROLES_SUCCESS {
    type: 'FETCH_ROLES_SUCCESS';
    payload: IApiRole[];
}

export type ActionType = IFETCH_ROLES_SUCCESS;

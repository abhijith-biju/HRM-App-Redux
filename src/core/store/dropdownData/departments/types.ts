import { IApiDepartment } from '../../../../interfaces/ApiDataInterface';

// Actions definitions
export interface IFETCH_DEPARTMENTS_SUCCESS {
    type: 'FETCH_DEPARTMENTS_SUCCESS';
    payload: IApiDepartment[];
}

export type ActionType = IFETCH_DEPARTMENTS_SUCCESS;

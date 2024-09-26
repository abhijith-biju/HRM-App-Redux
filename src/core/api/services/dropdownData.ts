import {
    IApiDepartment,
    IApiFetchSkill,
    IApiRole,
} from '../../../interfaces/ApiDataInterface';
import { API } from '../config/axios';

export const getSkills = () => {
    return API.get<IApiFetchSkill>('/skills');
};

export const getDepartments = () => {
    return API.get<IApiDepartment[]>('/departments');
};

export const getRoles = () => {
    return API.get<IApiRole[]>('/roles');
};

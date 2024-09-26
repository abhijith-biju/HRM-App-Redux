import {
    IApiEmployeePostRepsonse,
    IApiEmployeeSubmission,
    IApiFetchEmployee,
    IApiFetchEmployeesArray,
} from '../../../interfaces/ApiDataInterface';
import { ISearchParams } from '../../../interfaces/common';
import { API } from '../config/axios';

export const getEmployeesList = (searchParams: ISearchParams) => {
    const {
        offset,
        limit,
        sortBy,
        sortDir,
        skillIds,
        search: employeeName,
    } = searchParams;

    const skillsParam = skillIds ? `&skillIds=${skillIds}` : '';
    const EmpNameSearchParam = employeeName ? `&search=${employeeName}` : '';
    return API.get<IApiFetchEmployeesArray>(
        `/employee?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortDir=${sortDir}${skillsParam}${EmpNameSearchParam}`
    );
};

export const getEmployee = (employeeId: number) => {
    return API.get<IApiFetchEmployee>(`/employee/${employeeId}`);
};

export const deleteEmployee = (employeeId: number) => {
    return API.delete(`/employee/${employeeId}`);
};

export const addEmployee = (employeeData: IApiEmployeeSubmission) => {
    return API.post<IApiEmployeePostRepsonse>('/employee', employeeData);
};

export const editEmployee = (
    employeeId: number,
    employeeData: IApiEmployeeSubmission
) => {
    return API.patch(`/employee/${employeeId}`, employeeData);
};

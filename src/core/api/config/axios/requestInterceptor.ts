import { AxiosError, AxiosRequestConfig } from 'axios';
// import { getAccessToken } from '../../pages/Auth/helper';

export const onRequest = (config: AxiosRequestConfig) => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYWJoaWIiLCJpYXQiOjE3MDM3NTkwNDUsImV4cCI6MTcwMzc2MjY0NX0.vaUkCN2wJPAGvrRoO6OnVUqsu4gk81m1i_B9CJu7P3Y';
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    config.headers = {
        'Content-type': 'application/json',
        ...config.headers,
        ...headers,
    };
    return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> =>
    Promise.reject(error);

import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { onRequest, onRequestError } from './requestInterceptor';
import { onResponse, onResponseError } from './responseInterceptor';

export const API = axios.create({
    baseURL: 'https://vipinms.cloud/',
    timeout: 5000,
});

API.interceptors.request.use(
    onRequest as unknown as (
        value: InternalAxiosRequestConfig<any>
    ) =>
        | InternalAxiosRequestConfig<any>
        | Promise<InternalAxiosRequestConfig<any>>,
    onRequestError
);

API.interceptors.response.use(
    onResponse as unknown as (
        value: AxiosResponse<any, any>
    ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>,
    onResponseError
);

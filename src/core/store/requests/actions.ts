import { AppDispatch } from '..';
import * as types from './types';

//Action creators
export const requestStarted = (requestName: string): types.IREQUEST_STARTED => {
    return {
        type: 'REQUEST_STARTED',
        payload: {
            name: requestName,
        },
    };
};

export const requestFinished = (
    requestName: string
): types.IREQUEST_FINISHED => {
    return {
        type: 'REQUEST_FINISHED',
        payload: {
            name: requestName,
        },
    };
};

export const requestFailed = (
    requestName: string,
    requestError: Error
): types.IREQUEST_FAILED => {
    return {
        type: 'REQUEST_FAILED',
        payload: {
            name: requestName,
            error: requestError,
        },
    };
};

export const clearRequest = (requestName: string): types.ICLEAR_REQUEST => {
    return {
        type: 'CLEAR_REQUEST',
        payload: {
            name: requestName,
        },
    };
};

export const requestHelper = async <T>(
    dispatch: AppDispatch,
    requestName: string,
    request: () => Promise<T>
) => {
    dispatch(requestStarted(requestName));

    try {
        const response = await request();
        dispatch(requestFinished(requestName));
        return response;
    } catch (error) {
        dispatch(requestFailed(requestName, error as Error));
        throw error;
    }
};

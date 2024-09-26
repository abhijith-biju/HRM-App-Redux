import { RootState } from '..';
import { ActionType } from './types';

interface IRequest {
    name: string;
    inProgress: boolean;
    error: Error | null;
}

interface IRequestReducer {
    requests: IRequest[];
}

const initialState: IRequestReducer = {
    requests: [],
};

export const requestsRecuder = (
    state = initialState,
    action: ActionType
): IRequestReducer => {
    const requests = state.requests;
    const newRequestName = action.payload?.name;

    switch (action.type) {
        case 'REQUEST_STARTED': {
            const exisitingCall = requests.find(
                (request) => request.name === newRequestName
            );

            if (exisitingCall) {
                return {
                    ...state,
                    requests: requests.map((request) =>
                        request.name === newRequestName
                            ? { ...request, inProgress: true, error: null }
                            : request
                    ),
                };
            }

            return {
                ...state,
                requests: [
                    ...requests,
                    {
                        name: newRequestName,
                        inProgress: true,
                        error: null,
                    },
                ],
            };
        }
        case 'REQUEST_FINISHED':
            return {
                ...state,
                requests: requests.filter(
                    (request) => request.name !== newRequestName
                ),
            };
        case 'REQUEST_FAILED':
            return {
                ...state,
                requests: requests.map((request) =>
                    request.name === newRequestName
                        ? {
                              ...request,
                              inProgress: false,
                              error: action.payload.error,
                          }
                        : request
                ),
            };
        case 'CLEAR_REQUEST':
            return {
                ...state,
                requests: requests.filter(
                    (request) => request.name !== action.payload.name
                ),
            };
        default:
            return state;
    }
};

export const selectRequestInProgress =
    (requestName: string) => (state: RootState) =>
        state.requests.requests.find((req) => req.name === requestName)
            ?.inProgress || false;

export const selectRequestError = (requestName: string) => (state: RootState) =>
    state.requests.requests.find((req) => req.name === requestName)?.error ||
    null;

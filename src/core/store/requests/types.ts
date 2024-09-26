//Action Definitions
export interface IREQUEST_STARTED {
    type: 'REQUEST_STARTED';
    payload: {
        name: string;
    };
}

export interface IREQUEST_FINISHED {
    type: 'REQUEST_FINISHED';
    payload: {
        name: string;
    };
}

export interface IREQUEST_FAILED {
    type: 'REQUEST_FAILED';
    payload: {
        name: string;
        error: Error;
    };
}

export interface ICLEAR_REQUEST {
    type: 'CLEAR_REQUEST';
    payload: {
        name: string;
    };
}

export type ActionType =
    | IREQUEST_STARTED
    | IREQUEST_FINISHED
    | IREQUEST_FAILED
    | ICLEAR_REQUEST;

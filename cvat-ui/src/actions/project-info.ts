import { AnyAction, Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import getCore from '../core';

const cvat = getCore();

export const FETCH_PROJECT_REQUEST = 'FETCH_PROJECT_REQUEST';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE';

function fetchProjectRequest(): AnyAction {
    const action = {
        type: FETCH_PROJECT_REQUEST,
        payload: {},
    };

    return action;
}

function fetchProjectSuccess(project: any): AnyAction {
    const action = {
        type: FETCH_PROJECT_SUCCESS,
        payload: {
            project,
        },
    };

    return action;
}

function fetchProjectFailure(error: any): AnyAction {
    const action = {
        type: FETCH_PROJECT_FAILURE,
        payload: {
            error,
        },
    };

    return action;
}

export function fetchProjectRequestThunk(pid: number):
ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            dispatch(fetchProjectRequest());
            const project = (await cvat.projects.get({ id: pid }))[0];
            if (project) {
                dispatch(fetchProjectSuccess(project));
            } else {
                throw Error(`Project ${pid} wasn't found on the server`);
            }
        } catch (error) {
            dispatch(fetchProjectFailure(error));
        }
    };
}

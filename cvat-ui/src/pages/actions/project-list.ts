import { AnyAction, Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SearchQuery } from '../types/project-list';

import getCore from '../../core';

const cvat = getCore();

export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';

function fetchProjectsRequest(): AnyAction {
    const action = {
        type: FETCH_PROJECTS_REQUEST,
        payload: {},
    };

    return action;
}

function fetchProjectsSuccess(projects: any): AnyAction {
    const action = {
        type: FETCH_PROJECTS_SUCCESS,
        payload: {
            projects,
        },
    };

    return action;
}

function fetchProjectsFailure(error: any): AnyAction {
    const action = {
        type: FETCH_PROJECTS_FAILURE,
        payload: {
            error,
        },
    };

    return action;
}

export function fetchProjectsRequestThunk(query: SearchQuery):
ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        dispatch(fetchProjectsRequest());

        let result = null;
        try {
            result = await cvat.projects.get(query);
        } catch (error) {
            dispatch(fetchProjectsFailure(error));
            return;
        }

        const projects = Array.from(result);
        dispatch(fetchProjectsSuccess(projects));
    };
}

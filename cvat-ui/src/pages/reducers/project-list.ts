import { AnyAction } from 'redux';
import {
    FETCH_PROJECTS_REQUEST,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_FAILURE,
} from '../actions/project-list';

import {
    State,
} from '../types/project-list';

import {
    Status,
} from '../types/common';


const defaultState: State = {
    status: Status.INIT,
    error: null,
    projects: [],
};

export default (state: State = defaultState, action: AnyAction): State => {
    switch (action.type) {
        case FETCH_PROJECTS_REQUEST:
            return {
                ...defaultState,
                status: Status.BUSY,
            };
        case FETCH_PROJECTS_SUCCESS: {
            return {
                status: Status.DONE,
                error: null,
                projects: [...action.payload.projects],
            };
        }
        case FETCH_PROJECTS_FAILURE:
            return {
                status: Status.DONE,
                projects: [],
                error: {
                    title: 'Error',
                    message: action.payload.error,
                },
            };
        default:
            return state;
    }
};

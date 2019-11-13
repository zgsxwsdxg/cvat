import { AnyAction } from 'redux';
import {
    FETCH_PROJECTS_REQUEST,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_FAILURE,
} from '../actions/project-list';

import { State } from '../types/project-list';

const defaultState: State = {
    isInitialized: false,
    error: null,
    projects: [],
    query: null,
};

export default (state: State = defaultState, action: AnyAction): State => {
    switch (action.type) {
        case FETCH_PROJECTS_REQUEST:
            return defaultState;
        case FETCH_PROJECTS_SUCCESS: {
            return {
                isInitialized: true,
                error: null,
                projects: [...action.payload.projects],
                query: { ...action.payload.query },
            };
        }
        case FETCH_PROJECTS_FAILURE:
            return {
                isInitialized: true,
                projects: [],
                query: { ...action.payload.query },
                error: {
                    title: 'Error',
                    message: action.payload.error,
                },
            };
        default:
            return state;
    }
};

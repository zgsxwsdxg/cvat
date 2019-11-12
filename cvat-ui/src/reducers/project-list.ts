import { AnyAction } from 'redux';
import {
    FETCH_PROJECTS_REQUEST,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_FAILURE,
} from '../actions/project-list';

import { State } from '../types/project-list';

const defaultState: State = {
    initialized: false,
    message: '',
    projects: [],
    query: {
        page: 1,
        id: null,
        search: null,
        owner: null,
        assignee: null,
        name: null,
        status: null,
    },
};

export default (state: State = defaultState, action: AnyAction): State => {
    switch (action.type) {
        case FETCH_PROJECTS_REQUEST:
            return {
                ...state,
                message: '',
                initialized: false,
            };
        case FETCH_PROJECTS_SUCCESS: {
            return {
                initialized: true,
                message: '',
                projects: action.payload.projects,
                query: { ...action.payload.query },
            };
        }
        case FETCH_PROJECTS_FAILURE:
            return {
                initialized: true,
                projects: [],
                query: { ...action.payload.query },
                message: action.payload.error,
            };
        default:
            return state;
    }
};

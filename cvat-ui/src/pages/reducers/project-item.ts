import { AnyAction } from 'redux';

import {
    FETCH_PROJECT_SUCCESS,
    FETCH_PROJECT_FAILURE,
    FETCH_PROJECT_REQUEST,
} from '../actions/project-item';

import { State } from '../types/project-item';

const defaultState: State = {
    isInitialized: false,
    error: null,
    project: null,
};

export default function (state = defaultState, action: AnyAction): State {
    switch (action.type) {
        case FETCH_PROJECT_REQUEST:
            return defaultState;
        case FETCH_PROJECT_SUCCESS: {
            return {
                isInitialized: true,
                error: null,
                project: action.payload.project,
            };
        }
        case FETCH_PROJECT_FAILURE: {
            return {
                isInitialized: true,
                project: null,
                error: {
                    title: 'Error',
                    message: action.payload.error,
                },
            };
        }
        default:
            return { ...state };
    }
}

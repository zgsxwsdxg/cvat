import { AnyAction } from 'redux';

import {
    FETCH_PROJECT_SUCCESS,
    FETCH_PROJECT_FAILURE,
    FETCH_PROJECT_REQUEST,
} from '../actions/project-info';

import { State } from '../types/project-info';

const defaultState: State = {
    message: null,
    project: null,
};

export default function (state = defaultState, action: AnyAction): State {
    switch (action.type) {
        case FETCH_PROJECT_REQUEST:
            return {
                project: null,
                message: null,
            };
        case FETCH_PROJECT_SUCCESS: {
            return {
                message: null,
                project: action.payload.project,
            };
        }
        case FETCH_PROJECT_FAILURE: {
            return {
                project: null,
                message: action.payload.error,
            };
        }
        default:
            return { ...state };
    }
}

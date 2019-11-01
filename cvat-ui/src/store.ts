import thunk from 'redux-thunk';
import { createStore, applyMiddleware, Store } from 'redux';

import createRootReducer from './reducers/root-reducer';

const middleware = [
    thunk,
];

export default function createCVATStore(): Store {
    return createStore(
        createRootReducer(),
        applyMiddleware(...middleware),
    );
}

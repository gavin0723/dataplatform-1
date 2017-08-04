import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';

// import {persistStore, autoRehydrate} from 'redux-persist'
// import {createLogger} from 'redux-logger';

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            // applyMiddleware(thunk, createLogger()),
            applyMiddleware(thunk),
            // autoRehydrate(),
            DevTools.instrument()
        )
    )

    // persistStore(store)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

export default configureStore

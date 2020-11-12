import { applyMiddleware, compose, createStore, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers';
import rootEpic from './epics';
import { history } from '@/utils/util';

const routerMiddlewareInstance = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware();

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function configureStore(initialState: object = {}): Store {
  const middlewares = [routerMiddlewareInstance, epicMiddleware];

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store: Store = createStore(rootReducer, initialState, enhancer);
  epicMiddleware.run(rootEpic);
  return store;
}

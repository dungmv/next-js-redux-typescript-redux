import { createStore, AnyAction, compose, applyMiddleware } from 'redux';
import { MakeStore, createWrapper, HYDRATE } from 'next-redux-wrapper';
import { createLogicMiddleware } from 'redux-logic';
import rootReducer from './rootReducer';
import arrLogic from './rootLogic';

const deps = {};
let store: any = null

const initStore = (initialState = {}): any => {
  const logicMiddleware = createLogicMiddleware(arrLogic, deps);
  const middlewares = [
    logicMiddleware,
  ];
  const _store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
  return _store
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}



// create a makeStore function
const makeStore = () => initializeStore({});

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
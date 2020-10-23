import {AnyAction} from 'redux';
import * as types from './actionTypes';

const initialState = {
  data: [],
  isLoading: false,
};

export type State = typeof initialState;


export default (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    // case types.HOME_SEARCH_ACTION: {
    //   if (!action.payload) return state;
    //   const data = action.payload;
    //   return { ...state, isLoading: true };
    // }
    case types.HOME_SEARCH_SUCCESS: {
      if (!action.payload) return state;
      const data = action.payload;
      return { ...state, ...data };
    }
    
    default:
      return state;
  }
};

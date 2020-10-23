import { createLogic } from 'redux-logic';
import * as types from './actionTypes';
import { getDataByTags } from './api';

export const homeLogic = createLogic({
  type: types.HOME_SEARCH_ACTION, // filter for actions of this type
  cancelType: types.HOME_SEARCH_CANCELLED, // cancel if action is dispatched
  debounce: 100,
  latest: true, // only provide the latest if fired many times
  processOptions: {
    dispatchReturn: false, // dispatch from resolved/rejected promise
    failType: types.HOME_SEARCH_FAILED, // use action type for errors
  },
  async process({ action }: { action: { type: string, payload: string } }, dispatch, done) {
    console.log('logic', action.payload)
    if (action.payload) {
      const result: any = await getDataByTags(action.payload);
      console.log('result', result.data);
      dispatch({ type: types.HOME_SEARCH_SUCCESS, payload: { isLoading: true, data: result.data } });
    } else {
      dispatch({ type: types.HOME_SEARCH_SUCCESS, payload: { isLoading: true, data: [] } });
    }
    done();
  },
});



export default [
  homeLogic,
];

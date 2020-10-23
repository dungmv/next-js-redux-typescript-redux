import * as types from './actionTypes';

export const searchData = (tags: string = '') => ({
  type: types.HOME_SEARCH_ACTION,
  payload: tags,
});

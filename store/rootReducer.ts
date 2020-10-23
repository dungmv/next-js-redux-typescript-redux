import { combineReducers } from 'redux';
import home from '../screens/Home/data';

export default combineReducers({
  [home.constants.NAME]: home.reducer,
});

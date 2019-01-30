import { combineReducers } from 'redux';
import assesmentdetails from './assesments.reducer';
import ajaxStatus from './ajaxStatus.reducer';


export default combineReducers({
  assesmentdetails,
  ajaxStatus
});

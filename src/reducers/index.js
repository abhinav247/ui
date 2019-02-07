import { combineReducers } from 'redux';
import assesmentdetails from './assesments.reducer';
import ajaxStatus from './ajaxStatus.reducer';
import secondassessment from './secondassessments.reducer';

export default combineReducers({
  assesmentdetails,
  ajaxStatus,
  secondassessment
});

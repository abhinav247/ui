import {map, reduce} from 'lodash';
import moment from 'moment';

export const getAssessmentStatus = assessments => {
  let noOfDrafts = 0, noOfOpen = 0, noOfClosed = 0;
  reduce (
    assessments,
    (delays, value, key) => {
      const {status} = value;

      if (status === 'Draft') {
        ++noOfDrafts;
      }
      if (status === 'open') {
        ++noOfOpen;
      }
      if (status === 'Closed') {
        ++noOfClosed;
      }
    },
    noOfOpen,
    noOfClosed,
    noOfDrafts
  );

  return {
    noOfClosed,
    noOfDrafts,
    noOfOpen,
  };
};

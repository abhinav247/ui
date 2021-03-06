import {
  BEGIN_AJAX_CALL,
  END_AJAX_CALL,
  SELECT_COMPETENCIES,
  SELECT_QUESTIONS,
  ALL_GROUPS,
  ALL_COMPETENCY,
  ALL_QUESTIONS,
  FILE_ATTACHED,
  EDIT_MODE
} from '../actions/actionTypes';
import {selectCompentencies} from '../actions/seconassesment.action';
import {filter, union} from 'lodash';
import { stat } from 'fs';

let initialState = {
  selectedCompetencies: [],
  selectedQuestioner: [],
  groups:[],
  competency:[],
  questions:[],
  editMode:false
};

export default function secondassessment(state = initialState, action) {
  switch (action.type) {
    case EDIT_MODE:
    return {
      ...state,
      editMode:action.val
    }
    case ALL_GROUPS:
      return {
        ...state,
        groups: action.data,
      };
    case ALL_COMPETENCY:
      return {
        ...state,
        competency: action.data,
      };
    case ALL_QUESTIONS:
      return {
        ...state,
        questions: action.data,
      };
    case SELECT_COMPETENCIES:
      return {
        ...state,
        selectedCompetencies: state.selectedCompetencies.includes(action.compId)
          ? [
              ...filter(state.selectedCompetencies, comp => {
                return comp != action.compId;
              }),
            ]
          : [...state.selectedCompetencies, action.compId],
      };

    case SELECT_QUESTIONS:
      return {
        ...state,
        selectedQuestioner: [...action.questions],
      };
    case FILE_ATTACHED:
      return {
        ...state,
        fileattached:[action.file.name]
      }

    default:
      return {...state};
  }
}

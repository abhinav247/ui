import {
  BEGIN_AJAX_CALL,
  END_AJAX_CALL,
  SELECT_COMPETENCIES,
  SELECT_QUESTIONS,
  FILE_ATTACHED

} from "../actions/actionTypes";
import { selectCompentencies } from "../actions/seconassesment.action";
import { filter, union } from "lodash";

let initialState = {
  selectedCompetencies: [],
  selectedQuestioner: [],
  fileattached:null
};

export default function secondassessment(state = initialState, action) {
  switch (action.type) {
    case SELECT_COMPETENCIES:
      return {
        ...state,
        selectedCompetencies: state.selectedCompetencies.includes(action.compId)
          ? [
              ...filter(state.selectedCompetencies, comp => {
                return comp != action.compId;
              })
            ]
          : [...state.selectedCompetencies, action.compId]
      };

    case SELECT_QUESTIONS:
      return {
        ...state,
        selectedQuestioner: [...action.questions]
      };
    case FILE_ATTACHED:
      return {
        ...state,
        fileattached:[action.file.name]
      }

    default:
      return { ...state };
  }
}

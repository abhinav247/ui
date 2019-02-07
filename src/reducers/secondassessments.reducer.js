import {
  BEGIN_AJAX_CALL,
  END_AJAX_CALL,
  SELECT_COMPETENCIES,
  SELECT_QUESTIONS
} from "../actions/actionTypes";
import { selectCompentencies } from "../actions/seconassesment.action";
import { filter,union } from "lodash";

let initialState = {
  selectedCompetencies: [],
  selectedQuestioner:[]
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
    let newArray=union(state.selectedQuestioner,action.questions)
    return{
      ...state,
      selectedQuestioner:[...newArray]
    }

    default:
      return { ...state };
  }
}

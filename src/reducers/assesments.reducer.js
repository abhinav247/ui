import {
  NEW_JOB,
  ADD_PARTICIPANT,
  NEW_EVENT,
  ADD_ASSESTMENT,
  GET_ALL_JOBS,
  UPDATE_JOB,
  UPDATE_FIELD,
  UPDATE_EVENT_FIELD,
} from '../actions/actionTypes';

const initialState = {
  assesments: [],
};

export default function assesmentdetails (state = initialState, action) {
  switch (action.type) {
    case ADD_ASSESTMENT:
      return {
        assesments: [...state.assesments, action.data],
      };

    case ADD_PARTICIPANT:
    debugger;
      return {
        assesments: [
          ...state.assesments.map (assestment => {
            if (assestment._id === action.id) {
              return {
                ...assestment,
                primaryassestment: {
                  ...assestment.primaryassestment,
                  participants:[...assestment.participants,action.data]
              
                }
              };
            }
            return assestment;
          }),
        ],
      };

    case UPDATE_JOB:
      return {
        jobs: [
          ...state.jobs.map (job => {
            if (job._id === action.data._id) {
              return action.data;
            }
            return job;
          }),
        ],
      };

    case UPDATE_EVENT_FIELD:
      return {
        jobs: [
          ...state.jobs.map (job => {
            return {
              ...job,
              eventList: [
                ...job.eventList.map (event => {
                  if (event._id === action.eventId) {
                    return {
                      ...event,
                      [action.field]: action.value,
                    };
                  }
                  return event;
                }),
              ],
            };
          }),
        ],
      };
    case UPDATE_FIELD:
      return {
        ...state,
        jobs: [
          ...state.jobs.map (job => {
            if (job._id === action.rowId) {
              return {
                ...job,
                [action.field]: action.value,
              };
            }
            return job;
          }),
        ],
      };
    case NEW_EVENT:
      return {
        ...state,
        jobs: [
          ...state.jobs.map (job => {
            if (job._id === action._id) {
              return {
                ...job,
                events: [...job.events, action.data],
              };
            }
            return job;
          }),
        ],
      };
    default:
      return {...state};
  }
}

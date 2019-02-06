import {
  NEW_JOB,
  ADD_PARTICIPANT,
  NEW_EVENT,
  ADD_ASSESTMENT,
  GET_ALL_ASSESSMENTS,
  UPDATE_ASSESSMENT,
  UPDATE_FIELD,
  UPDATE_EVENT_FIELD,
  UPDATE_PARTICIPANT,
  UPDATE_PARTICIPANT_FIELD,
} from '../actions/actionTypes';

const initialState = {
  assesments: [],
};

export default function assesmentdetails (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ASSESSMENTS:
      return {
        assesments: action.data,
      };
    case ADD_ASSESTMENT:
      return {
        assesments: [...state.assesments, action.data],
      };

    case ADD_PARTICIPANT:
      return {
        assesments: [
          ...state.assesments.map (assestment => {
            if (assestment._id === action.data._id) {
              return action.data;
            }
            return assestment;
          }),
        ],
 
      };

    case UPDATE_PARTICIPANT:
      return  {
        assesments: [
          ...state.assesments.map (assesment => {
            return {
              ...assesment,
              primary: {
                ...assesment.primary,
                participants: [
                  ...assesment.primary.participants.map (participant => {
                    if (participant._id == action.updatedParticipant._id) {
                      return action.updatedParticipant
                    }
                    return participant;
                  }),
                ],
              }
            }
          })
        ]
      }

    case UPDATE_ASSESSMENT:
      return {
        assesments: [
          ...state.assesments.map (assesment => {
            if (assesment._id === action.data._id) {
              return action.data;
            }
            return assesment;
          }),
        ],
      };

    case UPDATE_PARTICIPANT_FIELD:
      return {
        assesments: [
          ...state.assesments.map (assesment => {
            return {
              ...assesment,
              primary: {
                ...assesment.primary,
                participants: [
                  ...assesment.primary.participants.map (participant => {
                    if (participant._id == action.participantId) {
                      return {
                        ...participant,
                        [action.field]: action.value,
                      };
                    }
                    return participant;
                  }),
                ],
              },
            };
          }),
        ],
      };

    case UPDATE_FIELD:
      return {
        ...state,
        assesments: [
          ...state.assesments.map (assestment => {
            if (assestment._id === action.rowId) {
              return {
                ...assestment,
                [action.field]: action.value,
              };
            }
            return assestment;
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

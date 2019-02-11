import {
  ADD_ASSESTMENT,
  ADD_PARTICIPANT,
  NEW_EVENT,
  GET_ALL_ASSESSMENTS,
  UPDATE_ASSESSMENT,
  UPDATE_FIELD,
  UPDATE_EVENT_FIELD,
  UPDATE_PARTICIPANT,
  UPDATE_PARTICIPANT_FIELD
} from "./actionTypes";
import { beginAjaxCall, endAjaxCall } from "./ajaxstatus.action";
import moment from "moment";
import { get, uniqueId } from "lodash";

export const defaultParticipant = {
  name: "Ravi Diwedi",
  email: "ravidiwedi106@gmail.com",
  emailsent: false
};

export const defaultAssestment = {
  assessment_title: "Hr Manager",
  type: "E",
  total_participants: 0,
  status: "Draft",
  startDate: moment(),
  closingDate: moment(),
  primary: {
    primary_startDate: moment(),
    no_response: 0,
    participants: []
  }
};

let url = "http://ec2-52-77-229-152.ap-southeast-1.compute.amazonaws.com:3600";

// let url = "http://localhost:5002";
export const postResource = (url, content) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content)
  };

  return fetch(url, requestOptions).then(res => {
    return res.json();
  });
};

export const getResource = url => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(url, requestOptions).then(res => {
    return res.json();
  });
};

export const deleteResource = url => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(url, requestOptions).then(res => {
    return res.json();
  });
};

export const putResource = (url, content) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content)
  };
  return fetch(url, requestOptions)
    .then(function success(resp) {
      return resp.json();
    })
    .catch(function(error) {
      // If there is any error you will catch them here
    });
};

export const addAssesment = () => dispatch => {
  dispatch(beginAjaxCall());
  postResource(`${url}/assessment/create`, defaultAssestment)
    .then(res => {
      debugger;
      dispatch(endAjaxCall());
      dispatch(addassesment(get(res, "data")));
    })
    .catch(error => {
      console.log(error);
    });
};




export const sendemail= (participantId)= dispatch => {
  dispatch(beginAjaxCall());
  putResource(`${url}/assessment/sendMail/${participantId}`)
    .then(res => {
      debugger;
      dispatch(endAjaxCall());
    })
    .catch(error => {
      console.log(error);
    });
};

export const onAddParticipant = assestmentid => dispatch => {
  dispatch(beginAjaxCall());
  postResource(`${url}/assessment/addprimarypart`, {
    id: assestmentid,
    ...defaultParticipant
  })
    .then(res => {
      let assessment = get(res, "data");
      dispatch(endAjaxCall());
      dispatch(onaddparticipant(assessment));
    })
    .catch(error => {
      console.log(error);
    });
};

const onaddparticipant = data => {
  return { type: ADD_PARTICIPANT, data };
};

const addassesment = data => {
  return { type: ADD_ASSESTMENT, data };
};


export const deleteassessment= (assesmentId)=> dispatch => {
  dispatch(beginAjaxCall());
  deleteResource(`${url}/assessment/delete/${assesmentId}`).then(res => {
    dispatch(allassessments(get(res, "data")));
    dispatch(endAjaxCall());
  });
};

export const deleteParticipant = (participantId, assesmentId) => dispatch => {
  dispatch(beginAjaxCall());
  postResource(`${url}/assessment/deleteprimarypart`,{participants_id:participantId,assessment_id:assesmentId}).then(res => {
    dispatch(assessmentUpdated(get(res, "data")));
    dispatch(endAjaxCall());
  });
};

export const getAllAssessment = () => dispatch => {
  dispatch(beginAjaxCall());
  getResource(`${url}/assessment/get`).then(res => {
    dispatch(allassessments(get(res, "assessments")));
    dispatch(endAjaxCall());
  });
};

export const updateAssessment = (assessmentId, field, value) => dispatch => {
  dispatch(beginAjaxCall());
  putResource(`${url}/assessment/update/${assessmentId}`, {
    [field]: value
  }).then(res => {
    dispatch(assessmentUpdated(get(res, "data")));
    dispatch(endAjaxCall());
  });
};

export const updateParticipant = (participantId, field, value) => dispatch => {
  dispatch(beginAjaxCall());
  putResource(`${url}/assessment/updateparticipant/${participantId}`, {
    [field]: value
  }).then(res => {
    dispatch(participantUpdated(get(res, "data")));
    dispatch(endAjaxCall());
  });
};

const allassessments = data => {
  return { type: GET_ALL_ASSESSMENTS, data };
};

export const updateField = (rowId, field, value) => {
  return { type: UPDATE_FIELD, rowId, field, value };
};

export const updatePaticipantField = (participantId, field, value) => {
  return { type: UPDATE_PARTICIPANT_FIELD, participantId, field, value };
};

export const participantUpdated = updatedParticipant => {
  return { type: UPDATE_PARTICIPANT, updatedParticipant };
};

const assessmentUpdated = data => {
  return { type: UPDATE_ASSESSMENT, data };
};

const eventAdded = (id, data) => {
  return { type: NEW_EVENT, data, id };
};

const JobAdded = data => {
  // return { type: NEW_JOB, data };
};

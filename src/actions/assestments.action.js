import {
  ADD_ASSESTMENT,
  ADD_PARTICIPANT,
  NEW_EVENT,
  GET_ALL_JOBS,
  UPDATE_JOB,
  UPDATE_FIELD,
  UPDATE_EVENT_FIELD
} from "./actionTypes";
import { beginAjaxCall, endAjaxCall } from "./ajaxstatus.action";
import moment from "moment";
import { get,uniqueId } from "lodash";

export const defaultParticipant = {
  name: "Ravi Diwedi",
  email: "ravidiwedi106@gmail.com",
  emailsent: false
};

export const defaultAssestment = {
  name: "Hr Manager",
  dated: "Draft",
  noofparticipants: 0,
  status: "Draft",
  response: 0,
  closingdate: moment(),
  primaryassestment: {
    startdate: moment(),
    noofresponses: 0,
    participants: []
  },
  secondaryassestment: {},
  tertiaryassestment: {}
};

// let url = 'http://ec2-13-233-158-190.ap-south-1.compute.amazonaws.com:5002'
let url = "http://localhost:5002";
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
  // dispatch(beginAjaxCall());
  // postResource(`${url}/postjob`, defaultJob)
  //   .then(res => {
  //     dispatch(endAjaxCall());
  //     dispatch(JobAdded(get(res, "data")));
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  dispatch(addassesment({_id:uniqueId(),...defaultAssestment}))


};


export const onAddParticipant= (assestmentid)=>dispatch=>{
    const data={_id:uniqueId(),...defaultParticipant}
    dispatch(onAddParticipant({data,assestmentid}))
}

const onaddparticipant= (data,id)=>{return {type:ADD_PARTICIPANT,data,id}}

const addassesment= data =>{ return { type:ADD_ASSESTMENT, data} }

export const deleteJob = jobid => dispatch => {
  dispatch(beginAjaxCall());
  deleteResource(`${url}/delete/${jobid}`).then(res => {
    dispatch(alljobs(get(res, "data")));
    dispatch(endAjaxCall());
  });
};

export const getAllJobs = () => dispatch => {
  dispatch(beginAjaxCall());
  getResource(`${url}/jobs`).then(res => {
    dispatch(alljobs(get(res, "jobs")));
    dispatch(endAjaxCall());
  });
};

export const updateJob = (jobId, field, value) => dispatch => {
  dispatch(beginAjaxCall());
  putResource(`${url}/job/${jobId}`, { [field]: value }).then(res => {
    dispatch(jobUpdated(get(res, "data")));
    dispatch(endAjaxCall());
  });
};

export const updateEvent = (eventId, content) => dispatch => {
  dispatch(beginAjaxCall());
  putResource(`${url}/updateEvent/${eventId}`, content).then(res => {
    dispatch(jobUpdated(get(res, "data")));
    dispatch(endAjaxCall());
  });
};

// const eventUpdated=data=>{return {type:EVENT_UPDATED,data} }

export const addEvents = id => dispatch => {
  dispatch(beginAjaxCall());

  let now = moment();
  // let endDate = now.add(defaultEvent.event_sla - 1, "minutes");

  // // postResource(`${url}/event`, { jobid: id, ...defaultEvent }).then(res => {
  //   dispatch(jobUpdated(get(res, "data")));
  //   dispatch(endAjaxCall());
  // });
};
const alljobs = data => {
  return { type: GET_ALL_JOBS, data };
};

export const updateField = (rowId, field, value) => {
  return { type: UPDATE_FIELD, rowId, field, value };
};

export const updateEventField = (eventId, field, value) => {
  return { type: UPDATE_EVENT_FIELD, eventId, field, value };
};

export const newEvent = id => dispatch => {
  // dispatch(eventAdded(id, defaultEvent));
};

const jobUpdated = data => {
  return { type: UPDATE_JOB, data };
};

const eventAdded = (id, data) => {
  return { type: NEW_EVENT, data, id };
};

const JobAdded = data => {
  // return { type: NEW_JOB, data };
};
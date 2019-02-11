import React, { Component } from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import moment from "moment";
import {
  onAddParticipant,
  updateParticipant,
  deleteParticipant,
  
} from "../actions/assestments.action";
import {sendemail} from '../actions/assestments.action';


class Primary extends Component {
  constructor(props) {
    super(props);
    this.addParticipant = this.addParticipant.bind(this);
    this.sendMail=this.sendMail.bind(this);
  }

  addParticipant(assestmentId) {
    const { onAddParticipant } = this.props;
    onAddParticipant(assestmentId);
  }


  sendMail(participantId){
    const {sendemail}=this.props;
    sendemail(participantId);
  }

  render() {
    const {
      getComponent,
      fieldEditing,
      updateParticipant,
      deleteParticipant
    } = this.props;
    const { primary, _id } = this.props.assesment;
    const { startDate, endDate, no_response, participants } = primary;
    return (
      <div>
        <div className="primary-assestment row">
          <div className=" col-md-3">
            <div className="assestment-details">
              <span>Starting Date</span>
              <span className="second_element">
                {moment(startDate).format("DD-MM-YYYY")}
              </span>
            </div>
          </div>
          <div className=" col-md-3">
            <div className="assestment-details">
              <span>No of Participants</span>
              <span className="second_element">{participants.length}</span>
            </div>
          </div>
          <div className=" col-md-3">
            <div className="assestment-details">
              <span>No. of Responses</span>
              <span className="second_element">{no_response}</span>
            </div>
          </div>
          <div className="add-participant-panel col-md-3">
            <button
              onClick={() => {
                this.addParticipant(_id);
              }}
            >
              Add Participant
            </button>
            <button className="upload_details">Product Designer.pdf</button>
          </div>
        </div>
        <div className="participant-listing row">
          <table>
            <tbody>
              {map(participants, participant => {
                return (
                  <div className=" participant-details row">
                    <div className="col-md-2">
                      {getComponent(
                        participant,
                        "name",
                        fieldEditing,
                        `name_${participant._id}`,
                        "name"
                      )}
                      {/* {participant.name} */}
                    </div>
                    <div className="col-md-3">
                      {getComponent(
                        participant,
                        "email",
                        fieldEditing,
                        `email_${participant._id}`,
                        "email"
                      )}
                      {/* {participant.email} */}
                    </div>
                    <div className="col-md-6">
                      {!participant.mail_status ? (
                        <button
                          className="report"
                          onClick={e => {
                            this.sendMail(participant._id)
                            // updateParticipant(
                            //   participant._id,
                            //   "mail_status",
                            //   true
                            // );
                          }}
                        >
                          Send Email
                        </button>
                      ) : (
                        <div className="row">
                          <div className="col-md-5 reports">View Report</div>
                          <div className="col-md-5 reports">Send Reminder</div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-1">
                      <button
                        // className="report"
                        onClick={e => {
                          deleteParticipant(participant._id, _id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    onAddParticipant,
    updateParticipant,
    deleteParticipant,
    sendemail
  }
)(Primary);

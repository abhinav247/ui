import React, {Component} from 'react';
import {connect} from 'react-redux';
import {map} from 'lodash';
import {onAddParticipant} from '../actions/assestments.action';

class Primary extends Component {
  constructor (props) {
    super (props);
    this.addParticipant = this.addParticipant.bind (this);
  }

  addParticipant (assestmentId) {
    debugger;
    const {onAddParticipant} = this.props;
    onAddParticipant (assestmentId);
  }

  render () {
    debugger;
    const {primaryassestment,_id} = this.props.assesment;
    const {startdate, noofresponses, participants} = primaryassestment;
    return (
      <div>
        <div className="primary-assestment row">
          <div className=" col-md-3">
            <div className="assestment-details">
              <span>Starting Date</span>
              <span className="second_element">
                {startdate.format ('DD-MM-YYYY')}
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
              <span className="second_element">{noofresponses}</span>
            </div>
          </div>
          <div className="add-participant-panel col-md-3">

            <button onClick={()=>{this.addParticipant(_id)}}>Add Participant</button>
            <span className="upload_details">Product Designer.pdf</span>
          </div>
        </div>
        <div className="participant-listing row">
          <table>
            <tbody>
              {map (participants, participant => {
                return (
                  <div className=" participant-details row">
                    <div className="col-md-3">{participant.name}</div>
                    <div className="col-md-3">{participant.email}</div>
                    <div className="col-md-3">
                      <button className="report">Send Email</button>
                    </div>
                    <div className="col-md-3">Remove</div>
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

export default connect (null, {
  onAddParticipant,
}) (Primary);

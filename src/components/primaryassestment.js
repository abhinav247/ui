

import React, { Component } from "react";
import { connect } from "react-redux";
import {map} from 'lodash';
import {onAddParticipant} from '../actions/assestments.action'


class Primary extends Component {
  constructor(props) {
    super(props);
    this.addParticipant=this.addParticipant.bind(this)
  }


  addParticipant(){
      const {onAddParticipant}=this.props;
      onAddParticipant();
  }

  render() {
    const {assesmentdetails}=this.props;
    const {startdate,noofresponses,participants}=assesmentdetails;
    return (
     <div>   
     <div className='primary-assestment row'>
        <div className="assestment-details col-md-3">
               <span>Starting Date</span>
               <span>{startdate.format('d/mm/yyyy')}</span>
        </div>
        <div className="assestment-details col-md-3">
               <span>No of Participants</span>
               <span>{participants.length}</span>
        </div>
        <div className="assestment-details col-md-3">
               <span>No. of Responses</span>
               <span>{noofresponses}</span>
        </div>
        <div className="add-participant-panel col-md-3">
                <button onClick={this.addParticipant}>Add Participant</button>
                <span>Product Designer.pdf</span>
        </div>
     </div>   
     <div className="participant-listing row">
        <table>
            <tbody>
              {map(participants,participant=>{
                  return(
                      <div className=" participant-details row">
                        <div className="col-md-3">{participant.name}</div>
                        <div className="col-md-3">{participant.email}</div>
                        <div className="col-md-3"><button className="report">Send Email</button></div>
                        <div className="col-md-3">Remove</div>
                      </div>
                  )
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
    onAddParticipant
  }
)(Primary);

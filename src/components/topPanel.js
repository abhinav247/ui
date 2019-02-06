import React, { Component } from "react";
import { map } from "lodash";
import { connect } from "react-redux";
import addIcon from "../assets/img/adding assessment.png";
import { addAssesment } from "../actions/assestments.action";
import { get } from "lodash";
import {getAssessmentStatus} from './utils'

const getTopPanelData = (listing,assesmentStatus)=> {
  return [
  {
    status: "Total Assessment",
    Count: listing.length
  },
  {
    status: "Open",
    Count: assesmentStatus.noOfOpen
  },
  {
    status: "Closed",
    Count: assesmentStatus.noOfClosed
  },
  {
    status: "Draft",
    Count: assesmentStatus.noOfDrafts
  
  }
]
};

class TopPanel extends Component {
  constructor(props) {
    super(props);
    this.onAddAssestment=this.onAddAssestment.bind(this);
  }

  onAddAssestment() {
    const {addAssesment} = this.props;
    addAssesment();
  }

  render() {
    const {listing}=this.props;
    const assesmentStatus=getAssessmentStatus(listing)
    return (
      <div className="top-panel row">
        <div className="assessment-details col-md-11">
          {map(getTopPanelData(listing,assesmentStatus), detail => {
            return (
              <div className="assesment-cell col-md-3">
                <span className="count">{detail.Count}</span>
                <span className="status">{detail.status}</span>
              </div>
            );
          })}
        </div>
        <div className="add-assessment col-md-1">
          <img src={addIcon} onClick={this.onAddAssestment}/>
        </div>
      </div>
    );
  }
}

export default connect(
  state=>{
    return {
      listing: get(state, "assesmentdetails.assesments")
    }
  },
  { addAssesment }
)(TopPanel);

import React, { Component } from "react";
import { map } from "lodash";
import { connect } from "react-redux";
import addIcon from "../assets/img/adding assessment.png";
import { addAssesment } from "../actions/assestments.action";
import { get } from "lodash";

const getTopPanelData = listing=> {
  return [
  {
    status: "Total Assessment",
    Count: listing.length
  },
  {
    status: "Open",
    Count: 0
  },
  {
    status: "Closed",
    Count: 0
  },
  {
    status: "Draft",
    Count: 0
  
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
    return (
      <div className="top-panel row">
        <div className="assessment-details col-md-11">
          {map(getTopPanelData(listing), detail => {
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

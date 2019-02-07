

import React, { Component } from "react";
import { connect } from "react-redux";
import dropIcon from '../assets/img/dropdown.png';
import userIcon from '../assets/img/Frame.png';
import StepWizard from 'react-step-wizard';
import CompetencySelection from './competencySelection';


class ReviewAssessment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
    
    //  <div className='header-panel row'>
    //    <div className=" col-md-8">
    //         <span>Welcome</span>
    //         <span className="user_name">Nimish,</span>
    //    </div>
    //     <div className=" user-panel col-md-4">
    //             <div className="evaluation-dropdown">
    //                 <span>360 Evaluation</span>
    //                 <img src={dropIcon}></img>
    //             </div>
    //             <div className="user-details">
    //                 <img className="user-icon" src={userIcon} ></img>
    //                 <span>Nimish</span>
    //                 <img src={dropIcon}></img>
    //             </div>
    //     </div>
    //  </div>
    );
  }
}

export default connect(
  null,
  { 
  }
)(ReviewAssessment);

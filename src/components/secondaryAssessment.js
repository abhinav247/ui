import React, { Component } from "react";
import { connect } from "react-redux";
import dropIcon from "../assets/img/dropdown.png";
import userIcon from "../assets/img/Frame.png";
import StepWizard from "react-step-wizard";
import CompetencySelection from "./competencySelection";
import VerticalTabs from "./verticalTabs";
import ReviewAssessment from "./reviewassessment";
import EmailTemplate from "./emailTemplate";
import {
  selectCompentencies,
  getallgroups,
  getallquestioners,
  getallcompetency
} from "../actions/seconassesment.action";
import { get } from "https";
import { stat } from "fs";

class SecondaryAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // competencies: getCompetencies(),
      // questioners: getQuestioners()
    };
  }

  componentWillMount(){
    debugger;
    const {getallcompetency,getallgroups,getallquestioners}=this.props;
    getallgroups();
    getallcompetency();
    getallquestioners();
  }

  render() {
    
    return (
      <StepWizard>
        <CompetencySelection {...this.props} />
        <VerticalTabs {...this.props} />
        <ReviewAssessment {...this.props} />
        <EmailTemplate />
      </StepWizard>
    );
  }
}

export default connect(
  state=>{
    return {
      groups:get(state,'secondassessment.groups'),
      competency:get(state,'secondassessment.competency'),
      questions:get(state,'secondassessment.questions')
    }
  },
  {getallcompetency,getallgroups,getallquestioners}
)(SecondaryAssessment);

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
  getCompetencies,
  getQuestioners
} from "../actions/seconassesment.action";

class SecondaryAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competencies: getCompetencies(),
      questioners: getQuestioners()
    };
  }

  render() {
    return (
      <StepWizard>
        <CompetencySelection {...this.state} />
        <VerticalTabs {...this.state} />
        <ReviewAssessment {...this.state} />
        <EmailTemplate />
      </StepWizard>
    );
  }
}

export default connect(
  null,
  {}
)(SecondaryAssessment);

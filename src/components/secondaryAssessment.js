import React, { Component } from "react";
import { connect } from "react-redux";
import dropIcon from "../assets/img/dropdown.png";
import userIcon from "../assets/img/Frame.png";
import StepWizard from "react-step-wizard";
import CompetencySelection from "./competencySelection";
import VerticalTabs from "./verticalTabs";
import ReviewAssessment from "./reviewassessment";

class SecondaryAssessment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StepWizard>
        <CompetencySelection />
        <VerticalTabs />
        <ReviewAssessment />
      </StepWizard>
    );
  }
}

export default connect(
  null,
  {}
)(SecondaryAssessment);

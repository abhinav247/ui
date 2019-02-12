import React, { Component } from "react";
import { connect } from "react-redux";
import dropIcon from "../assets/img/dropdown.png";
import userIcon from "../assets/img/Frame.png";
import StepWizard from "react-step-wizard";
import CompetencySelection from "./competencySelection";
import { get, groupBy, filter, map, find } from "lodash";

class ReviewAssessment extends Component {
  constructor(props) {
    super(props);
  }

  renderQuestioner() {
    
    const { questions, selectedQuestioner } = this.props;
    let groupedQuestions = groupBy(
      filter(questions, ques => {
        return selectedQuestioner.includes(ques._id);
      }),
      "competency_id"
    );

    if (groupedQuestions.length === 0) 
            return

    return map(groupedQuestions, group => {
      return this.renderQuestionerBlock(group);
    });
  }

  renderQuestionerBlock(group) {
  
    let comp = find(this.props.competency, comp => {
      return comp._id === group[0].competency_id;
    });
    return (
      <div className="questioners_panel">
        <div className="header">{comp.title}</div>
        {map(group, ques => {
          return <div className="question">{ques.title}</div>;
        })}
      </div>
    );
  }

  render() {
    const { selectedQuestioner } = this.props;
    return <div className="review_selection">
        <div>Questionnaire Preview</div>
        {this.renderQuestioner()}
        <div className="buttons_panel">
          <button
            onClick={() => {
              this.props.previousStep();
            }}
          >
            Back
          </button>
          <button
            onClick={() => {
              this.props.nextStep();
            }}
          >
            Next
          </button>
          <button className="cancel_button"
            onClick={() => {
              this.props.firstStep();
            }}
          >
            Cancel
          </button>
        </div>
      </div>;
  }
}

export default connect(
  state => {
    return {
      selectedQuestioner: get(state, "secondassessment.selectedQuestioner")
    };
  },
  {}
)(ReviewAssessment);

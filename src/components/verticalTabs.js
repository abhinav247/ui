import React, { Component } from "react";
import { connect } from "react-redux";
import dropIcon from "../assets/img/dropdown.png";
import userIcon from "../assets/img/Frame.png";
import StepWizard from "react-step-wizard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  selectCompentencies,
  getCompetencies,
  getQuestioners
} from "../actions/seconassesment.action";
import Questioners from "./questioners";
import { filter, get, map, find } from "lodash";

class VerticalTabs extends React.PureComponent {
  constructor(props) {
    super(props);
    let { selectedCompetencies } = this.props;
    this.state = {
      selectedIndex: 0
    };
    this.onselect = this.onselect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedCompetencies[0] !== this.props.selectedCompetencies[0]
    ) {
      let { selectedCompetencies } = nextProps;
      this.setState({
        selectedComp: this.findCompetency(selectedCompetencies[0]),
        selectedCompQues: this.getQuestioners(selectedCompetencies[0])
      });
    }
  }

  findCompetency(CompId) {
    return find(this.props.competencies, comp => {
      return comp.id === CompId;
    });
  }

  getQuestioners(compId) {
    return filter(this.props.questioners, ques => {
      return ques.compentency_id === compId;
    });
  }

  onselect(comp, index) {
    let filteredQues = this.getQuestioners(comp.id);

    this.setState({
      selectedCompQues: filteredQues,
      selectedIndex: index,
      selectedComp: comp
    });
  }

  render() {
    const { selectedCompQues, selectedIndex, selectedComp } = this.state;
    const { selectedCompetencies, competencies, questioners } = this.props;

    const fiteredObjs = filter(competencies, comp => {
      return selectedCompetencies.includes(comp.id);
    });

    return (
      <div className="row vertical_tabs">
        <div className="col-md-3 tabs_list">
          {map(fiteredObjs, (comp, index) => {
            return (
              <div
                className={`competency_tab ${
                  selectedIndex === index ? "selection" : ""
                }`}
                onClick={() => {
                  this.onselect(comp, index);
                }}
              >
                {comp.title}
              </div>
            );
          })}
        </div>
        <div className="col-md-9">
          <Questioners
            selectedComp={selectedComp}
            allquestions={questioners}
            questions={selectedCompQues}
          />
        </div>
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
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      selectedCompetencies: get(state, "secondassessment.selectedCompetencies")
    };
  },
  {}
)(VerticalTabs);

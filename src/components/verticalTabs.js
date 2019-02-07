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

class VerticalTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competencies: getCompetencies(),
      questioners: getQuestioners()
    };
    this.onselect = this.onselect.bind(this);
  }

  onselect(index, lastIndex, e) {
    const { questioners, competencies } = this.state;

    let selectedComp = find(competencies, comp => {
      return comp.title === e.target.innerHTML;
    });
    let filteredQues = filter(questioners, ques => {
      return ques.compentency_id === selectedComp.id;
    });

    this.setState({ slectedCompQues: filteredQues });
  }

  render() {
    const { competencies, questioners, slectedCompQues } = this.state;
    const { selectedCompetencies } = this.props;

    const fiteredObjs = filter(competencies, comp => {
      return selectedCompetencies.includes(comp.id);
    });

    return (
      <div className="vertical_tabs">
        <Tabs onSelect={this.onselect}>
          <TabList>
            {map(fiteredObjs, comp => {
              return <Tab>{comp.title}</Tab>;
            })}
          </TabList>

          {map(fiteredObjs, filtered => {
            return (
              <TabPanel>
                <Questioners allquestions={questioners} questions={slectedCompQues} />
              </TabPanel>
            );
          })}
        </Tabs>
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

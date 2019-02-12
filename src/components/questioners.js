import React, { Component } from "react";
import { get, map, find } from "lodash";
import { connect } from "react-redux";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";
import { selectQuestiones } from "../actions/seconassesment.action";

class Questioners extends Component {
  constructor(props) {
    super(props);
    this.selectQuestioner = this.selectQuestioner.bind(this);
  }

  selectQuestioner(questions) {
    let { allquestions, selectQuestiones, selectedComp } = this.props;
    selectQuestiones(questions);
  }

  render() {
    const { questions } = this.props;
    return (
      <div className="questioner_selection">
        <CheckboxGroup 
          value={this.props.selectedQuestioner}
          checkboxDepth={2}
          name="questions"
          onChange={this.selectQuestioner}
        >
          {map(questions, ques => {
            return (
              <label className="round">
                <Checkbox value={ques._id} />
                <label for="checkbox"></label>
                {ques.title}
              </label>
            );
          })}
        </CheckboxGroup>
      

      </div>
    );
  }
}

export default connect(
  state => {
    return {
      selectedQuestioner: get(state, "secondassessment.selectedQuestioner")
    };
  },
  { selectQuestiones }
)(Questioners);

import React, { Component } from "react";
import { get, map, find } from "lodash";
import { connect } from "react-redux";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";
import {selectQuestiones} from '../actions/seconassesment.action';

class Questioners extends Component {
  constructor(props) {
    super(props);
    this.selectQuestioner=this.selectQuestioner.bind(this);
  }

  selectQuestioner(questions){
        let {allquestions,selectQuestiones}=this.props;
        selectQuestiones(questions);
        
  }

  render() {
    const { questions } = this.props;
    return (
      <CheckboxGroup checkboxDepth={2} name="questions" onChange={this.selectQuestioner}>
        {map(questions, ques => {
          return (
            <label>
              <Checkbox value={ques.id} />
              {ques.title}
            </label>
          );
        })}
      </CheckboxGroup>
    );
  }
}

export default connect(
  state => {
    return {
      //   listing: get(state, "assesments")
    };
  },
  {}
)(Questioners);

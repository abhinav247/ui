import React, { Component } from "react";
import { get, map, find } from "lodash";
import { connect } from "react-redux";
import Assestments from "./assestments";
import searchIcon from "../assets/img/search.png";
import {confirm} from '../actions/seconassesment.action';

class EmailTemplate extends Component {
  constructor(props) {
    super(props);
  }


  confirmQuestioner(){
    const {questions,confirm,assesment}=this.props;
    confirm(questions,assesment._id);
   
  }

  render() {
    return (
      <div className="email_template">
        <div className="header">Email</div>
        <div className="email_content">{`Lorem Ipsum is simply dummy text of 
        the printing and typesetting industry. Lorem Ipsum has been 
        the industry&apos;s standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it 
        to make a type specimen book. It has survived not only five centuries, 
        but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`}</div>
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
              this.confirmQuestioner()
            }}
          >
            confirm
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
      questions: get(state, "secondassessment.selectedQuestioner")
    };
  },
  {confirm}
)(EmailTemplate);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import dropIcon from '../assets/img/dropdown.png';
import userIcon from '../assets/img/Frame.png';
import {getCompetencies} from '../actions/seconassesment.action';
import {groupBy, mapValues, find, map} from 'lodash';
import {groups} from '../actions/seconassesment.action';



class CompetencySelection extends Component {
  constructor (props) {
    super (props);
    this.state = {
      competencies: getCompetencies (),
      comArray:[]
    };
  }

  selectCompetencies(comp){
      const {comArray}=this.state;
      if(comArray.includes(comp.id)){
        comArray.pop(comp.id)
     
      }
      else{
        comArray.push(comp.id)
      }
      this.setState(comArray);
      
  }

  renderCompetencies (group) {
  
    const {comArray}=this.state;
    let selectedGroup = find (groups, function (o) {
      return o.id === group[0].groupId;
    });

    return (
      <div className="competency-group-panel">
        <div className=" group_name">{selectedGroup.title}</div>
        <div className=" com_panel">
          {map (group, comp => {
            return (
              <div className={`competency ${comArray.includes(comp.id)?'selection':''}`} onClick={()=>{this.selectCompetencies(comp)}}>
                {comp.title}
              </div>
            );
          })}
        </div>

      </div>
    );
  }

  render () {
    const {competencies} = this.state;
    const groups = groupBy (competencies, 'groupId');

    const renderer = [];
    mapValues (groups, group => {
      renderer.push (this.renderCompetencies (group));
    });

    return (
      <div className="compentancy_selection">
        <div className="row ">
          <div className="col-md-6 main-header">
            Select Competencies
          </div>
          <div className="col-md-6" style={{textAlign: 'right'}}>
            <img />
            <a>Know About Competencies</a>
          </div>

        </div>
        <div className="competency_groups" />
        {renderer}
        <div className="buttons_panel">
            <button onClick={()=>{this.props.nextStep()}}>
              Next 
            </button>
            <button onClick={()=>{this.props.firstStep()}}>
              Cancel 
            </button>
        </div>
      </div>
    );
  }
}

export default connect (null, {}) (CompetencySelection);

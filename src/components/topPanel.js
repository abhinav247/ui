import React, {Component} from 'react';
import {map} from 'lodash'
import {connect} from 'react-redux';
import dropIcon from '../assets/img/Polygon.png';
import userIcon from '../assets/img/Polygon.png';

const TopPanelData = [
  {
    status: 'Total Assessment',
    Count: 0,
  },
  {
    status: 'Open',
    Count: 0,
  },
  {
    status: 'Closed',
    Count: 0,
  },
  {
    status: 'Draft',
    Count: 0,
  },
];

class TopPanel extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div className="top-panel row">
        <div className="assessment-details col-md-11">
          {map(TopPanelData,(detail)=>{
              return (
              <div className="assesment-cell col-md-3">
                <span className="count">{detail.Count}</span>
                <span className="status">{detail.status}</span>
              </div>
              )
          })}
        </div>
        <div className="add-assessment col-md-1">
            
        </div>
      </div>
    );
  }
}

export default connect (null, {}) (TopPanel);

import React, { Component } from "react";
import { get, map, find } from "lodash";
import { connect } from "react-redux";
import Assestments from './assestments';
import searchIcon from '../assets/img/search.png'

class Listing extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
  

    return (

      <div className="listing-panel">
          <div className="search-panel row">
            <input className="col-md-3" placeholder="search" type="text" name="search"></input>
            <img src={searchIcon} className="search-icon"></img>
          </div>
          <div className="assestments">
            <Assestments/>
          </div>
      </div>
      
    );
  }
}

export default connect(
  state => {
    return {
      listing: get(state, "assesments")
    };
  },
  {}
)(Listing);

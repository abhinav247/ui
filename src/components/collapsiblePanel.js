import React, { Component } from "react";

import Header from './Header';
import { connect } from "react-redux";



class HomePage extends Component {
  constructor(props) {
    super(props);

    
  }

 

  render() {
    return (
       <div className="container">
            <Header/>

       </div>
    );
  }
}

export default connect(
  null,
 {}
)(HomePage);

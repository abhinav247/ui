import React, {Component} from 'react';
import {connect} from 'react-redux';
// import JobsTable from './components/JobsTable';
 import Header from './components/Header';
// import SideNav from './components/SideNav';
// import {getAllJobs} from './actions/jobs.action';
import './assets/style/main.scss';
import TopPanel from './components/topPanel';
import Listing from './components/listing';

class App extends Component {
  constructor (props) {
    super (props);
  }

  componentWillMount () {
    // const {getAllJobs}=this.props;
    // getAllJobs();
  }

  render () {
    return (
      <div className="container">
        <Header />
        <TopPanel />
        <Listing />

      </div>
    );
  }
}

export default connect (
  state => {
    return {
      // loading: state.ajaxStatus > 0,
    };
  },
  {}
) (App);

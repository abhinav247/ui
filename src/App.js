import React, {Component} from 'react';
import {connect} from 'react-redux';
// import JobsTable from './components/JobsTable';
 import Header from './components/Header';
// import SideNav from './components/SideNav';
 import {getAllAssessment} from './actions/assestments.action';
 import {getCompetencies,getQuestioners} from './actions/seconassesment.action';
import './assets/style/main.scss';
import TopPanel from './components/topPanel';
import Listing from './components/listing';
import Loader from "react-loader";
import {
  getallgroups,
  getallquestioners,
  getallcompetency
} from "./actions/seconassesment.action";

class App extends Component {
  constructor (props) {
    super (props);
  }

  componentWillMount () {
    const {getAllAssessment, getallcompetency, getallgroups, getallquestioners}=this.props;
    getAllAssessment();
    getallgroups();
    getallcompetency();
    getallquestioners();
  }

  render () {

    const {loading}=this.props;
    return (
      <div className="container">
        <Header />
        <TopPanel />
        <Listing />
        <Loader loaded={!loading}/> 
      </div>
    );
  }
}

export default connect (
  state => {
    return {
      loading: state.ajaxStatus > 0,
    };
  },
  {getAllAssessment,getallgroups,getallcompetency,getallquestioners}
) (App);

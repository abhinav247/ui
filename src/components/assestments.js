import React, { Component } from "react";
import { get } from "lodash";
import { connect } from "react-redux";
import expanderIcon from "../assets/img/hamburger.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PrimaryAssestment from "./primaryassestment";
import moment from "moment";
import {updateField} from '../actions/assestments.action'

class Assestments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      expandedRows: [],
      open: false,
      value: "",
      showJobMenu: false
    };
  }

  getComponent(row, field, fieldEditing, controlId, classname) {
    // const { event_status } = row;
    const self = this;
    if (fieldEditing !== "" && fieldEditing === controlId) {
      switch (field) {
        case "job_description":
          return <div />;
          // <textarea
          //   ref={node => (this[controlId] = node)}
          //   className={classname}
          //   name={field}
          //   onChange={e => {
          //     this.onChange(row._id, field, e.target.value);
          //   }}
          //   // onKeyPress={this._handleKeyPress.bind(this)}
          //   value={row[field]}
          // />
          // );
          break;

        default:
          return (
            <input
              ref={node => (this[controlId] = node)}
              name={field}
              value={row[field]}
              onChange={e => {
                this.onChange(row._id, field, e.target.value);
              }}
            />
          );
      }
    }

    switch (field) {
      case "job_description":
        return (
          <p
            className={classname ? classname : ""}
            id={controlId}
            onClick={e => {
              self.editField(e, field, row);
            }}
          >
            {row[field]}
          </p>
        );

      default:
        return (
          <div
            className={classname ? classname : ""}
            id={controlId}
            onClick={e => {
              self.editField(e, field, row);
            }}
          >
            {row[field]}
          </div>
        );
    }
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  onChange(id, field, value) {
    const { data } = this.state;
    const { updateField} = this.props;

    updateField(id, field, value);

    this.setState({ updatedValue: value });
  }

  componentWillUnMount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick(e) {
    // const { fieldEditing } = this.state;
    // if (this[fieldEditing] && this[fieldEditing].contains(e.target)) {
    //   return;
    // } else {
    //   this.saveChanges();
    // }
    // if (this.action && this.action.contains(e.target)) {
    //   return;
    // } else {
    //   this.setState({ showJobMenu: false, jobTobeDeleted: "" });
    // }
  }

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(_id => _id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  editField(e, field, row) {
    this.setState({
      fieldEditing: e.target.id,
      controlId: row._id,
      field: field
    });
  }

  RenderEvents(row) {
    // const { fieldEditing } = this.state;
    // const { eventList, _id } = row;
    // const renderevent = (event, slaid) => {
    //   const { event_status } = event;
    //   // alert(moment(event.event_endDate).format('MMMM Do YYYY, h:mm:ss a'))
    //   return (
    //     <div className="sla_event">
    //       {this.getComponent(
    //         event,
    //         "event_description",
    //         fieldEditing,
    //         `event_description_${_id}_${slaid}`,
    //         "event_description"
    //       )}
    //       {this.getComponent(
    //         event,
    //         "event_sla",
    //         fieldEditing,
    //         `event_sla${_id}_${slaid}`,
    //         "event_sla"
    //       )}
    //       <button
    //         className={`sla_button ${event.event_signal}`}
    //         onClick={() => {
    //           this.completeEvent(event, _id, event);
    //         }}
    //       />
    //     </div>
    //   );
    // };
    // return (
    //   <div className="job_events">
    //     {map(eventList, (event, index) => {
    //       return renderevent(event, index);
    //     })}
    //   </div>
    // );
  }

  RenderJobDescription(assesment) {
    return (
      <Tabs>
        <TabList>
          <Tab>Primary Assestment</Tab>
          <Tab>Secondary Assestment </Tab>
          <Tab>Tertiary Assestment</Tab>
        </TabList>

        <TabPanel>
          <h2>
            <PrimaryAssestment assesment={assesment} />
          </h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    );
  }

  saveChanges() {
    // const { fieldEditing, controlId, field, updatedValue, data } = this.state;
    // const { updateJob, updateEvent } = this.props;
    // if (this[fieldEditing]) {
    //   if (updatedValue !== "") {
    //     if (["event_description", "event_sla"].includes(field)) {
    //       let currentJob = find(data, job => {
    //         return find(job.eventList, event => {
    //           return event._id === controlId;
    //         });
    //       });
    //       if (field === "event_sla") {
    //         let eventIndex = currentJob.eventList.findIndex(
    //           event => event._id == controlId
    //         );
    //         let content = {
    //           jobId: currentJob._id,
    //           eventIndex,
    //           field,
    //           updatedValue
    //         };
    //         updateEvent(controlId, content);
    //       } else {
    //         updateEvent(controlId, {
    //           jobId: currentJob._id,
    //           [field]: updatedValue
    //         });
    //       }
    //     } else {
    //       updateJob(controlId, field, updatedValue);
    //     }
    //   }
    // }
    // this.setState({
    //   fieldEditing: "",
    //   controlId: "",
    //   field: "",
    //   updatedValue: ""
    // });
  }

  renderItem(assesment) {
    const clickCallback = () => this.handleRowClick(assesment._id);
    const itemRows = [
      <tr
        key={"row-data-" + assesment._id}
        className={
          this.state.expandedRows.includes(assesment._id)
            ? "active"
            : "item-row"
        }
      >
        <td className="assestment__type">E</td>
        <td>
          <div style={{ fontFamily: "robotobold" }}>
            {assesment.assessment_title}
          </div>
          <div>{assesment.status}</div>
        </td>
        <td>{assesment.total_participants}</td>
        <td style={{ color: "#ffc107" }}>{assesment.status}</td>
        <td>no response </td>

        {/* <td className={`job-signal ${getSignalClass(jobSignal)} `}> */}
        <td>{moment(assesment.closingDate).format("DD-MM-YYYY")}</td>
        <td onClick={clickCallback} className="expander">
          <img src={expanderIcon} />
        </td>
      </tr>
    ];

    if (this.state.expandedRows.includes(assesment._id)) {
      itemRows.push(
        <tr key={"row-expanded-" + assesment._id} className="row__expanded">
          <td colspan={7}>{this.RenderJobDescription(assesment)}</td>
        </tr>
      );
    }

    return itemRows;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listing !== nextProps.listing)
      this.setState({ data: nextProps.listing });
  }

  render() {
    let allItemRows = [];
    this.state.data.forEach(item => {
      const perItemRows = this.renderItem(item);
      allItemRows = allItemRows.concat(perItemRows);
    });

    return (
      <table>
        <thead>
          <tr>
            <th />
            <th>Name and Title</th>
            <th>No. Of Participants</th>
            <th>Status</th>
            <th>Response</th>
            <th>Closing Date</th>
            <th />
          </tr>
        </thead>
        <tbody>{allItemRows}</tbody>
      </table>
    );
  }
}

export default connect(
  state => {
    return {
      listing: get(state, "assesmentdetails.assesments")
    };
  },
  {updateField}
)(Assestments);

import React, { Component } from "react";
import { get } from "lodash";
import { connect } from "react-redux";
import expanderIcon from "../assets/img/hamburger.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PrimaryAssestment from "./primaryassestment";
import moment from "moment";
import {
  updateField,
  updateAssessment,
  updateParticipant,
  updatePaticipantField
} from "../actions/assestments.action";
import SecondaryAssessment from './secondaryAssessment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class Assestments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      expandedRows: [],
      open: false,
      value: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.editField = this.editField.bind(this);
  }

  getComponent(row, field, fieldEditing, controlId, classname) {
    // const { event_status } = row;
    const self = this;
    if (fieldEditing !== "" && fieldEditing === controlId) {
      switch (field) {
        case "closingDate":
          let selectedDate = moment(row[field]).format("yyyy/MM/dd");
          return (
            <div ref={node => (this[controlId] = node)}>
              <DatePicker
                name={field}
                dateFormat="yyyy/MM/dd"
                selected={row[field]}
                onChange={date => {
                  this.onChange(row._id, field, date);
                }}
              />
            </div>
          );

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
      case "closingDate":
        return (
          <div
            className={classname ? classname : ""}
            id={controlId}
            onClick={e => {
              self.editField(e, field, row);
            }}
          >
            {moment(row[field]).format("DD-MM-YYYY")}
          </div>
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
    const { updateField, updatePaticipantField } = this.props;

    if (["name", "email"].includes(field)) {
      updatePaticipantField(id, field, value);
    } else {
      updateField(id, field, value);
    }

    this.setState({ updatedValue: value });
  }

  componentWillUnMount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick(e) {
    const { fieldEditing } = this.state;

    if (this[fieldEditing] && this[fieldEditing].contains(e.target)) {
      return;
    } else {
      this.saveChanges();
    }
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

  RenderJobDescription(assesment) {
    const { fieldEditing } = this.state;
    return (
      <Tabs>
        <TabList>
          <Tab>Primary Assestment</Tab>
          <Tab>Secondary Assestment </Tab>
          <Tab>Tertiary Assestment</Tab>
        </TabList>

        <TabPanel>
          <h2>
            <PrimaryAssestment
              getComponent={this.getComponent.bind(this)}
              fieldEditing={fieldEditing}
              assesment={assesment}
            />
          </h2>
        </TabPanel>
        <TabPanel>
          <h2><SecondaryAssessment/></h2>
        </TabPanel>
      </Tabs>
    );
  }

  saveChanges() {
    const { fieldEditing, controlId, field, updatedValue } = this.state;
    const { updateAssessment, updateParticipant } = this.props;
    if (this[fieldEditing]) {
      if (updatedValue !== "") {
        if (["name", "email"].includes(field)) {
          updateParticipant(controlId, field, updatedValue);
        } else {
          let DateValue =
            field == "closingDate" ? moment(updatedValue) : updatedValue;

          updateAssessment(controlId, field, DateValue);
        }
      }
    }
    this.setState({
      fieldEditing: "",
      controlId: "",
      field: "",
      updatedValue: ""
    });
  }

  renderItem(assesment) {
    const { fieldEditing } = this.state;
    const { _id } = assesment;
    const clickCallback = () => this.handleRowClick(assesment._id);

    const assetType = type => {
      switch (type) {
        case "employee":
          return "employee-type";
        case "professional":
          return "professional";
        default:
          return "employee-type";
      }
    };

    const itemRows = [
      <tr
        key={"row-data-" + assesment._id}
        className={
          this.state.expandedRows.includes(assesment._id)
            ? "active"
            : "item-row"
        }
      >
        <td className={`${assetType(assesment.type)}`}>E</td>
        <td>
          <div style={{ fontFamily: "robotobold" }}>
            {this.getComponent(
              assesment,
              "assessment_title",
              fieldEditing,
              `assessment_title_${_id}`,
              "assessment_title"
            )}
            {/* {assesment.assessment_title} */}
          </div>
          <div>{assesment.status}</div>
        </td>
        <td>{assesment.total_participants}</td>
        <td style={{ color: "#ffc107" }}>{assesment.status}</td>
        <td>no response </td>

        {/* <td className={`job-signal ${getSignalClass(jobSignal)} `}> */}
        <td>
          {this.getComponent(
            assesment,
            "closingDate",
            fieldEditing,
            `closingDate_${_id}`,
            "closingDate"
          )}
        </td>
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
  { updateField, updateAssessment, updatePaticipantField, updateParticipant }
)(Assestments);

import React, { Component } from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import CheckIcon from "@material-ui/icons/Check";
import WarningIcon from "@material-ui/icons/Warning";

import FIRModal from "./FIRModal";
import App from "./SignaturePad/App";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Divider, Button } from "@material-ui/core";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import FIRfile from './FIRfile'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const styles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 125,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

class Ongoing extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    columns: [
      { title: "FIR id", field: "firid" },
      { title: "Complainant Name", field: "name" },
      { title: "Date", field: "date" },
    ],

    data: [],
    actions: [
      (rowData) => ({
        icon: () => <AssignmentTurnedInIcon />,
        tooltip: "Mark as completed",
        onClick: this.closef
      }),
    ],
    open: false,
    firid: null,
  };

  closef = (event, rowData) => {
    this.closeFIR(rowData.firid);
  };

  handleRowClick = (event, rowData) => {
    //alert("Downloading: "+rowData.firid);

    //var id = this.firIdFinder(rowData.firid)
    window.open("/fir/"+rowData.firid, "_blank")

  };
  close = () => {
    this.setState({
      open: false,
    });
  };

  closeFIR(firid) {
    var body = { acceptance: "4" };

    fetch("http://localhost:7000/api/admin_side/" + firid, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-auth-token": JSON.parse(localStorage.getItem("login")).token,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        response.json().then((result) => {
          //console.log(result.errors[0].msg);
          console.log(response.status);
          if (response.status === 200) {
            console.log(result);
            alert(firid + " has been closed");
            this.setState(
              {
                data: [],
              },
              () => this.fetchFIRList()
            );
          } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  async componentWillMount() {
    //API Call to fetch pending FIR list

    this.fetchFIRList();
  }
  fetchFIRList() {
    //console.log("http://localhost:7000/api/admin_side?uin="+JSON.parse(localStorage.getItem("login")).uin)
    fetch("http://localhost:7000/api/admin_side/fir", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": JSON.parse(localStorage.getItem("login")).token,
      },
      body: JSON.stringify({
        uin: JSON.parse(localStorage.getItem("login")).uin,
      }),
    })
      .then((response) => {
        response.json().then((result) => {
          //console.log(result.errors[0].msg);
          console.log(response.status);
          if (response.status === 200) {
            console.log(result);
            result.forEach((element) => {
              if (element.acceptance === 1) {
                if(JSON.parse(localStorage.getItem('login')).user==="IO" && element.officer === JSON.parse(localStorage.getItem('login')).email){
                  var temp = {
                    name: element.name,
                    firid: element._id,
  
                    date: element.date,
                  };
  
                  this.setState({
                    data: [...this.state.data, temp],
                  });
                } 
                else if(JSON.parse(localStorage.getItem('login')).user!="IO"){
                  var temp = {
                    name: element.name,
                    firid: element._id,
  
                    date: element.date,
                  };
  
                  this.setState({
                    data: [...this.state.data, temp],
                  });
                }
                
              }
            });
          } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MaterialTable
          options={{
            exportButton: true,
            exportFileName: "Ongoing Investigations",
            actionsColumnIndex: -1,

          }}
          doubleHorizontalScroll={true}
          onRowClick={(event, rowData) => this.handleRowClick(event, rowData)}
          icons={tableIcons}
          title="Ongoing Investigation"
          columns={this.state.columns}
          data={this.state.data}
          actions={this.state.actions}
        />

      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Ongoing);

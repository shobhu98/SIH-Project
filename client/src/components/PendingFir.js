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

export default class PendingFir extends Component {
  state = {
    columns: [
      { title: "FIR id", field: "firid" },
      { title: "Complainant Name", field: "name" },
      { title: "Status", field: "status" },
    ],

    data: [],
    actions: [
      {
        icon: () => <CheckIcon />,
        tooltip: "Accept FIR",
        onClick:  (event, rowData) => this.accept(event, rowData),
      },
      (rowData) => ({
        icon: () => <WarningIcon />,
        tooltip: "Request more information",
        onClick: (event, rowData) =>
          alert("More infromation requested for " + rowData.firid),
        disabled: (event, rowData) => this.moreInfo(event, rowData),
      }),
    ],
    open: false,
    firid: null,
    openSignaturePad: true,
  };

  accept = (event,rowData) => {
    alert(rowData.firid)
    this.setState({
      openSignaturePad: true,
      firid: rowData.firid,
    });
  }
  moreInfo = (event,rowData) => {
    alert(rowData.firid)

  }

  handleRowClick = (event, rowData) => {
    //alert("Downloading: "+rowData.firid);
    console.log(rowData.firid);

    this.setState({
      open: true,
      firid: rowData.firid,
    });
  };
  close = () => {
    this.setState({
      open: false,
    });
  };

  closeSignaturePad = () => {
    this.setState({
      open: false,
    });
  };
  acceptFIR(firid) {
    fetch("http://localhost:7000/api/admin_side?id=" + { firid }, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-auth-token": JSON.parse(localStorage.getItem("login")).token,
      },
    }).then((response) => {
      response.json().then((result) => {
        //console.log(result.errors[0].msg);
        console.log(response.status);
        if (response.status === 200) {
          console.log(result);
          
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
              if (element.acceptance === 0) {
                var temp = {
                  name: element.name,
                  firid: element.FIRNUM,
                  status: "Pending",
                };
                this.setState({
                  data: [...this.state.data, temp],
                });
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
    return (
      <div>
        <MaterialTable
          options={{
            exportButton: true,
            exportFileName: "Pending_FIRs",
            actionsColumnIndex: -1,
          }}
          onRowClick={(event, rowData) => this.handleRowClick(event, rowData)}
          icons={tableIcons}
          title="Pending FIR"
          columns={this.state.columns}
          data={this.state.data}
          actions={this.state.actions}
        />
        {this.state.open === true ? (
          <FIRModal data={this.state.firid} close={this.close} accept={this.accept} moreInfo={this.moreinfo}/>
        ) : (
          <></>
        )}

        {this.state.openSignaturePad === true ? (
          <App data={this.state.firid} closeSignaturePad={this.closeSignaturePad} />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

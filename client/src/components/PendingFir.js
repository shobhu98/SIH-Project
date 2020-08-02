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
import Grid from "@material-ui/core/Grid";
import InfoIcon from "@material-ui/icons/Info";
import BlockIcon from '@material-ui/icons/Block';

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

class PendingFir extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    columns: [
      { title: "FIR id", field: "firid" },
      { title: "Complainant Name", field: "name" },
      { title: "Status", field: "status" },
      { title: "Date", field: "date" },
    ],

    data: [],
    actions: [
      {
        icon: () => <CheckIcon />,
        tooltip: "Accept FIR",
        onClick: (event, rowData) => this.accept(event, rowData),
      },
      (rowData) => ({
        icon: () => <InfoIcon />,
        tooltip: "Request more information",
        onClick: (event, rowData) => this.moreInfo(event, rowData),
        disabled: rowData.status === "More information requested",
      }),
      {
        icon: () => <BlockIcon />,
        tooltip: "Reject FIR",
        onClick: (event, rowData) => this.reject(event, rowData),
      },
      (rowData) => ({
        icon: () => <WarningIcon />,
        tooltip: "Toggle Spam",
        onClick: (event, rowData) => this.spam(event, rowData),
      }),
    ],
    open: false,
    firid: null,
    openSignaturePad: false,
    status: null,
    openMoreInfo: false,
    moreinfoText: null,
    accorrej: null,

  };

  spam = (event, rowData) => {
    //alert("clicked");
    var spam=0
    rowData.spam===1?spam=0:spam=1;
    var body = { spam:spam+"", acceptance: "0"};
    fetch("http://localhost:7000/api/admin_side/" + rowData.firid, {
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
           if(result.spam===1){
             alert("Marked as Spam");
           }
           else{
             alert("Unmarked as Spam");
           }
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
  };

  accept = (event, rowData) => {
    //this.acceptFIR(rowData.firid)
    this.acceptStart(rowData.firid);
  };
  acceptStart = (firid) => {
    this.setState({
      openSignaturePad: true,
      firid: firid,
      accorrej: "accept",
    });
  };
  rec = (sign, type) => {
    console.log(this.state.firid + "  " + type + "  " + sign);
    this.state.accorej==="Accept"?this.acceptFIR(this.state.firid, type, sign):
    this.rejectFIR(this.state.firid, type, sign);
  };
  acceptFIR(firid, type, sign) {
    var body = { acceptance: "1", type_of_crime: type, signature: sign };

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
            alert(firid + " has been accepted");
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









  reject = (event, rowData) => {
    //this.acceptFIR(rowData.firid)
    this.rejectStart(rowData.firid);
  };
  rejectStart = (firid) => {
    this.setState({
      openSignaturePad: true,
      firid: firid,
      accorrej:"reject"
    });
  };
  // rec = (sign, type) => {
  //   console.log(this.state.firid + "  " + type + "  " + sign);
  //   this.acceptFIR(this.state.firid, type, sign);
  // };
  rejectFIR(firid, type, sign) {
    var body = { acceptance: "5", rejection_reason: type, signature: sign };

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
            alert(firid + " has been rejected");
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





  
  moreInfo = (event, rowData) => {
    //this.moreInfoStart(rowData.firid);
    this.setState({
      moreInfoStart: true,
      firid: rowData.firid,
    });
    //alert("set open");
  };
  moreInfoStart = (firid, data) => {
    //alert("clicked");
    var body = { acceptance: "2", moreinfo: data };
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
            alert("More information has been requested for " + firid);
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
  };

  // firIdFinder(firid){
  //   var id;
  //   this.state.data.forEach(element => {
  //     if(firid === element._id){

  //     }
  //   });
  //   return id;
  // }

  handleRowClick = (event, rowData) => {
    //alert("Downloading: "+rowData.firid);

    //var id = this.firIdFinder(rowData.firid)

    fetch("http://localhost:7000/api/admin_side/" + rowData.firid, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-auth-token": JSON.parse(localStorage.getItem("login")).token,
      },
    })
      .then((response) => {
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
    this.setState({
      open: true,
      firid: rowData.firid,
      status: rowData.status,
    });
  };
  close = () => {
    this.setState({
      open: false,
    });
  };

  closeSignaturePad = () => {
    this.setState({
      openSignaturePad: false,
    });
  };
  

  async componentWillMount() {
    //API Call to fetch pending FIR list

    this.fetchFIRList();
  }
  fetchFIRList() {
    //console.log("http://localhost:7000/api/admin_side?uin="+JSON.parse(localStorage.getItem("login")).uin)
    fetch("http://192.168.43.195:7000/api/admin_side/fir", {
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
                  firid: element._id,
                  status: "Pending",
                  date: element.date,
                  spam: element.spam,
                };

                this.setState({
                  data: [...this.state.data, temp],
                });
              } else if (element.acceptance === 2) {
                var temp = {
                  name: element.name,
                  firid: element._id,
                  status: "More information requested",
                  date: element.date,
                  spam: element.spam,
                };

                this.setState({
                  data: [...this.state.data, temp],
                });
              } else if (element.acceptance === 3) {
                var temp = {
                  name: element.name,
                  firid: element._id,
                  status: "Complainant has updated",
                  date: element.date,
                  spam: element.spam,
                } 

                this.setState({
                  data: [...this.state.data, temp],
                });
              } else if (element.acceptance === 5) {
                var temp = {
                  name: element.name,
                  firid: element._id,
                  status: "Rejected",
                  date: element.date,
                  spam: element.spam,
                } 

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
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <MaterialTable
              options={{
                exportButton: true,
                exportFileName: "Pending_FIRs",
                actionsColumnIndex: -1,
                rowStyle: (rowData) => ({
                  borderLeft:
                    rowData.spam === 1
                      ? "6px solid red"
                      : "More information requested" === rowData.status
                      ? "6px solid yellow"
                      :"Rejected" === rowData.status
                      ? "6px solid gray"
                      : "6px solid green",
                }),
              }}
              doubleHorizontalScroll={true}
              onRowClick={(event, rowData) =>
                this.handleRowClick(event, rowData)
              }
              icons={tableIcons}
              title="Pending FIR"
              columns={this.state.columns}
              data={this.state.data}
              actions={this.state.actions}
            />
            {this.state.open === true ? (
              <FIRModal
                firid={this.state.firid}
                status={this.state.status}
                moreinfo={this.moreInfoStart}
                close={this.close}
                accept={this.acceptStart}
                moreInfo={this.moreinfo}
                accorrej={this.state.accorrej}
              />
            ) : (
              <></>
            )}

            {this.state.openSignaturePad === true ? (
              <App
                data={this.state.firid}
                closeSignaturePad={this.closeSignaturePad}
                rec={this.rec}
                open={this.state.openSignaturePad}
              />
            ) : (
              <></>
            )}

            {this.state.moreInfoStart === true ? (
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={true}
                className={classes.modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={true}>
                  <div className={classes.paper}>
                    <h2 id="transition-modal-title">
                      Request more information for FIR:<br></br>{" "}
                      {this.state.firid}
                    </h2>
                    <p id="transition-modal-description">
                      <TextareaAutosize
                        aria-label="minimum height"
                        rowsMin={10}
                        fullWidth={true}
                        style={{ width: "100%" }}
                        placeholder="Please type your question here"
                        onChange={(event) => {
                          this.setState({ moreinfoText: event.target.value });
                        }}
                      />
                      <Divider />
                      <Button
                        
                        onClick={() => {
                          this.moreInfoStart(
                            this.state.firid,
                            this.state.moreinfoText
                          );
                          this.setState({ moreInfoStart: false });
                        }}
                      >
                        Submit
                      </Button>
                      <Button
                        onClick={() => {
                          this.setState({ moreInfoStart: false });
                        }}
                      >
                        Close
                      </Button>
                    </p>
                  </div>
                </Fade>
              </Modal>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PendingFir);

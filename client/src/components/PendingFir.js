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
import { Divider, Button, Typography } from "@material-ui/core";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InfoIcon from "@material-ui/icons/Info";
import BlockIcon from "@material-ui/icons/Block";
import { saveAs } from 'file-saver';
import GetAppIcon from "@material-ui/icons/GetApp";
import FileBase64 from 'react-file-base64';
import logo from '../Assets/MPlogo.jpg'

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
      (rowData) => ({
        icon: () => <BlockIcon />,
        tooltip: "Reject FIR",
        onClick: (event, rowData) => this.reject(event, rowData),
        disabled: rowData.status === "Rejected",
      }),
      (rowData) => ({
        icon: () => <WarningIcon />,
        tooltip: "Toggle Spam",
        onClick: (event, rowData) => this.spam(event, rowData),
      }),
      (rowData) => ({
        icon: () => <GetAppIcon />,
        tooltip: "Download",
        onClick: (event, rowData) => this.contentSet(event, rowData),
      }),
    ],
    open: false,
    firid: null,
    openSignaturePad: false,
    status: null,
    openMoreInfo: false,
    moreinfoText: null,
    accorrej: null,

    content: null,
  };
  contentSet = (event,rowData) => {
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
            this.setState(
              {
                content: result,
              },
              () =>
                this.pdf()
            );

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
  /*
this.state.content.ipc_sections!=undefined?(
              "<p>AI IPC Sections:"+ this.state.content.ipc_sections.map((element,i) => {
                
                return element+", "
              })+
              "</p>")
            :"<></>"
            +
  */
  pdf = () => {
    //var content = this.state.content;

    var ipc = this.state.content.ipc_sections!=undefined?(
      "<p>AI IPC Sections:"+ this.state.content.ipc_sections.map((element,i) => {
        
        return element+", "
      })+
      "</p>")
    :"<p><p/>"

    var aadhar = this.state.content.ipc_sections!=undefined?(
      "<p>Aadhar                     : "+ this.state.content.aadhar+
      "</p>")
    :"<p><p/>"
    var passport = this.state.content.passport!=undefined?(
      "<p>Passport number            : "+ this.state.content.passport+
      "</p>")
    :"<p><p/>"

    
      
    var htmldata="<div style=\" border-style: solid; border-color: blue; padding: 40px\">"+

    "<img width=\"42\" height=\"42\" style=\"vertical-align:top\" src=data:image/jpeg;base64,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>"+
      "<h4>"+
        "FIR ID :"+this.state.content._id+
      "</h4>"+
      
      
            ipc+
              "<p >IPC Sections(As set by SHO): "+ this.state.content.type_of_crime+"</p>"+
           
              "<p >Current Status             : "+ this.state.content.name+"</p>"+
      
              "<p >Name                       : "+ this.state.content.name+"</p>"+
    
              "<p >Email                      : "+this.state.content.email+"</p>"+
   
              "<p >Father's Name              : "+this.state.content.fathersName+"</p>"+
  
              "<p >DOB                        : "+this.state.content.DOB+"</p>"+
    
              "<p >Mobile number              : "+this.state.content.mobile+"</p>"+
              aadhar+
              passport+
          
              "<p >Complainant's Resident Country: "+this.state.content.country+"</p>"+
        
              "<p >Incident District: "+this.state.content.District+"</p>"+
              "<hr>"+
     
              "<p >Incident</p>"+
      
            
              +this.state.content.incident+
              "<hr>"+
         
              "<p >Reason for Delay(if any)</p>"+
    
              this.state.content.delay+
              "<hr>"+
          
              "<p >Possible Suspects</p>"
  
              +this.state.content.suspects+
              "<hr>"+
            
            

            "<p>Complainant Signature</p>"+
              "<img width:30 height:30 "+
              "src="+this.state.content.signature_user+"></img>"+
              "<hr>"+
            
            "<p>SHO Signature</p>"+
              "<img width:30 height:30 "+
              "src="+this.state.content.signature+"></img>"+
           
            
            
           
       
        "</div>"+"";
        console.log(htmldata)
    var body={html:htmldata}
    fetch("http://localhost:7000/api/pdfGenerate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-auth-token": JSON.parse(localStorage.getItem("login")).token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res
                .arrayBuffer()
                .then(res => {
                    const blob = new Blob([res], { type: 'application/pdf' })
                    saveAs(blob, 'fir.pdf')
                })
                .catch(e => alert(e))
      })
      .catch((err) => {
        alert(err);
      });
  };

  spam = (event, rowData) => {
    //alert("clicked");
    var spam = 0;
    rowData.spam === 1 ? (spam = 0) : (spam = 1);
    var body = { spam: spam };
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
            if (result.spam === 1) {
              alert("Unmarked as Spam");
            } else {
              alert("Marked as Spam");
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
    this.setState(
      {
        accorrej: "accept",
      },
      () =>
        this.setState({
          openSignaturePad: true,
          firid: firid,
        })
    );
  };
  rec = (sign, type, officer) => {
    console.log(this.state.firid + "  " + type + "  " + sign + " " + officer);
    this.state.accorrej === "accept"
      ? this.acceptFIR(this.state.firid, type, sign, officer)
      : this.rejectFIR(this.state.firid, type, sign);
  };
  acceptFIR(firid, type, sign, officer) {
    var body = {
      acceptance: "1",
      type_of_crime: type,
      signature: sign,
      officer: officer,
    };

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
    this.setState(
      {
        accorrej: "reject",
      },
      () =>
        this.setState({
          openSignaturePad: true,
          firid: firid,
        })
    );
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
    var body = { acceptance: "2", more_info: data };
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
            this.setState(
              {
                content: result,
              },
              () =>
                this.setState({
                  open: true,
                  firid: rowData.firid,
                  status: rowData.status,
                })
            );

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
                };

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
                };

                this.setState({
                  data: [...this.state.data, temp],
                });
              } else if (
                element.acceptance === 10 &&
                JSON.parse(localStorage.getItem("login")).user === "SP"
              ) {
                var temp = {
                  name: element.name,
                  firid: element._id,
                  status: "Appeal from complainant",
                  date: element.date,
                  spam: element.spam,
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
  accorrej = () => {
    return this.state.accorrej;
  };

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
                      : "Rejected" === rowData.status
                      ? "6px solid gray"
                      : "6px solid green",

                  backgroundColor:
                    "Appeal from complainant" === rowData.status ? "red" : null,
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
            {this.state.open === true && this.state.content != null ? (
              <FIRModal
                firid={this.state.firid}
                status={this.state.status}
                moreinfo={this.moreInfoStart}
                close={this.close}
                accept={this.acceptStart}
                moreInfo={this.moreinfo}
                content={this.state.content}
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
                accorrej={this.state.accorrej}
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

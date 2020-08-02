import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { DropzoneArea } from "material-ui-dropzone";
import MaterialTable from "material-table";


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


import {
  Divider,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import "./list.css";
import FIRModalOngoing from "./FIRModalOngoing";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { forwardRef } from "react";

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';

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


export default class FIRfile extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    originalFIR: false,
    firid: this.props.match.params.id,
    caseAssets: true,
    caseNotes: true,
    status: null,
    files: [],

    columns: [
      
      { title: "Name", field: "name" },
    ],

    data: [{name:"evidence1"}],
    actions: [
      (rowData) => ({
        icon: () => <CloudDownloadIcon />,
        tooltip: "Download",
        onClick: (rowData) => this.download(rowData),
      }),
      (rowData) => ({
        icon: () => <DeleteIcon />,
        tooltip: "Delete",
        onClick: (rowData) => this.delete(rowData),
        disabled: this.state.status==="closed"?true:false
      }),
    ],
    open: false,
    firid: null,
    status: null
  };

  download(rowData) {}
  delete(rowData) {}

  handleChange(files) {
    this.setState({
      files: files,
    });

    console.log(this.state.files);
  }
  upload() {
    const data = new FormData();
    data.append("file", this.state.files[0]);
    data.append("filename", "uploadedData");

    console.log(this.state.files[0]);
    fetch("https://localhost:7000/dataChange", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data);
      });
  }

  componentWillMount() {
    this.fetch();
  }
  fetch() {
    fetch(
      "http://localhost:7000/api/admin_side/" + this.props.match.params.id,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-auth-token": JSON.parse(localStorage.getItem("login")).token,
        },
      }
    )
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
  }
  originalFIR = () => {
    if (this.state.originalFIR === true) {
      this.setState({
        originalFIR: false,
      });
    } else {
      this.setState({
        originalFIR: true,
      });
    }
  };

  closeOriginal = () => {
    this.setState({
      originalFIR: false,
    });
  };

  caseAssets = () => {
    if (this.state.caseAssets === true) {
      this.setState({
        caseAssets: false,
      });
    } else {
      this.setState({
        caseAssets: true,
      });
    }
  };
  caseNotes = () => {
    if (this.state.caseNotes === true) {
      this.setState({
        caseNotes: false,
      });
    } else {
      this.setState({
        caseNotes: true,
      });
    }
  };
  setStatus = () => {};

  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4} md={2}>
            <Button variant="outlined" onClick={this.originalFIR}>
              Open Original FIR
            </Button>
          </Grid>

          <Grid item xs={4} md={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.caseAssets}
                  onChange={this.caseAssets}
                  name="checkedA"
                />
              }
              label="Case Assets"
            />
          </Grid>

          <Grid item xs={4} md={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.caseNotes}
                  onChange={this.caseNotes}
                  name="checkedA"
                />
              }
              label="Case Notes"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <Box p={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      style={{ height: "100%", width: "100%" }}
                      label="Status(for complainant)"
                      variant="filled"
                      defaultValue={this.state.status}
                      onChange={(e) => {
                        this.setState({ status: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      style={{ height: "100%", width: "100%" }}
                      variant="outlined"
                      onClick={this.setStatus}
                      disabled= {this.state.status==="closed"?true:false}
                    >
                      Set Status
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {this.state.originalFIR === true ? (
            <FIRModalOngoing
              firid={this.state.firid}
              close={this.closeOriginal}
            />
          ) : (
            <></>
          )}
          {this.state.caseNotes === true ? (
            <Grid item xs={12} md={6}>
              {this.state.caseAssets === true ? (
                <Paper>
                  <Box m={2} p={3}>
                    <Typography variant="h4">Assets</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={12} className="list">
                        <MaterialTable
                          options={{
                            actionsColumnIndex: -1,
                          }}
                          doubleHorizontalScroll={true}
                          
                          icons={tableIcons}
                          title="Files"
                          columns={this.state.columns}
                          data={this.state.data}
                          actions={this.state.actions}
                        />
                      </Grid>

                      {this.state.status!="closed"?<>
                      <Grid item xs={12} >
                        <DropzoneArea
                          className="zone"
                          acceptedFiles={[
                            ".csv",
                            ".xlsx",
                            ".png",
                            ".jpg",
                            ".jpeg",
                          ]}
                          minSize={0}
                          maxFileSize={10242880}
                          onChange={this.handleChange.bind(this)}
                          filesLimit={1}
                          showFileNames={true}
                          style={{ height: 100 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          style={{ width: "100%" }}
                          onClick={this.upload.bind(this)}
                          
                        >
                          Upload
                        </Button>
                      </Grid>
                      </>:null}
                    </Grid>
                  </Box>
                </Paper>
              ) : (
                <></>
              )}
            </Grid>
          ) : (
            <Grid item xs={12} md={12}>
              {this.state.caseAssets === true ? (
                <Paper>
                  <Box m={2} p={3}>
                  <Typography variant="h4">Assets</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={12} className="list">
                        <MaterialTable
                          options={{
                            actionsColumnIndex: -1,
                          }}
                          doubleHorizontalScroll={true}
                          
                          icons={tableIcons}
                          title="Files"
                          columns={this.state.columns}
                          data={this.state.data}
                          actions={this.state.actions}
                        />
                      </Grid>
                      {this.state.status!="closed"?<>
                      <Grid item xs={12} >
                        <DropzoneArea
                          className="zone"
                          acceptedFiles={[
                            ".csv",
                            ".xlsx",
                            ".png",
                            ".jpg",
                            ".jpeg",
                          ]}
                          minSize={0}
                          maxFileSize={10242880}
                          onChange={this.handleChange.bind(this)}
                          filesLimit={1}
                          showFileNames={true}
                          style={{ height: 100 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          style={{ width: "100%" }}
                          onClick={this.upload.bind(this)}
                          
                        >
                          Upload
                        </Button>
                      </Grid>
                      </>:null}
                      
                    </Grid>

                    
                  </Box>
                </Paper>
              ) : (
                <></>
              )}
            </Grid>
          )}

          {this.state.caseAssets === true ? (
            <Grid item xs={12} md={6}>
              {this.state.caseNotes === true ? (
                <Paper>
                  <Box m={2} p={3}>
                    <Typography variant="h4">Notes</Typography>
                    <TextareaAutosize
                      className="notes"
                      aria-label="minimum height"
                      rowsMin={26}
                      fullWidth={true}
                      style={{ width: "100%" }}
                    ></TextareaAutosize>
                    <Button variant="outlined" style={{ width: "100%" }} disabled= {this.state.status==="closed"?true:false}>
                      Save
                    </Button>
                  </Box>
                </Paper>
              ) : (
                <></>
              )}
            </Grid>
          ) : (
            <Grid item xs={12} md={12}>
              {this.state.caseNotes === true ? (
                <Paper>
                  <Box m={2} p={3}>
                    <Typography variant="h4">Notes</Typography>
                    <TextareaAutosize
                      aria-label="minimum height"
                      rowsMin={20}
                      fullWidth={true}
                      style={{ width: "100%" }}
                    ></TextareaAutosize>
                    <Button variant="outlined" style={{ width: "100%" }} disabled= {this.state.status==="closed"?true:false}>
                      Save
                    </Button>
                  </Box>
                </Paper>
              ) : (
                <></>
              )}
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

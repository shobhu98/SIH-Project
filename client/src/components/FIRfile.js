import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Divider,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  TextareaAutosize,
} from "@material-ui/core";
import "./modal.css";
import FIRModalOngoing from "./FIRModalOngoing";

export default class FIRfile extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    originalFIR: false,
    firid: this.props.match.params.id,
    caseAssets: true,
    caseNotes: true,
  };
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

  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4} md={2}>
            <Button variant="outlined" onClick={this.originalFIR}>
              Original FIR
            </Button>
          </Grid>

          <Grid item xs={4} md={2}>
            <Button variant="outlined" onClick={this.caseAssets}>
              Case Assets
            </Button>
          </Grid>

          <Grid item xs={4} md={2}>
            <Button variant="outlined" onClick={this.caseNotes}>
              Case Notes
            </Button>
          </Grid>
          <Grid item xs={0} md={6}></Grid>

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

                    <Button type="file"></Button>
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

                    <Button type="file"></Button>
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
                      aria-label="minimum height"
                      rowsMin={20}
                      fullWidth={true}
                      style={{ width: "100%" }}
                    ></TextareaAutosize>
                    <Button variant="outlined" style={{ width: "100%" }}>
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
                    <Button variant="outlined" style={{ width: "100%" }}>
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

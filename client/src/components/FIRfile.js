import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Divider, Button, Typography, Grid } from "@material-ui/core";
import "./modal.css";
import FIRModalOngoing from './FIRModalOngoing'

export default class FIRfile extends Component {
  constructor(props) {
    super(props);
  }
  state={
    originalFIR:false,
    firid:this.props.match.params.id
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
    if(this.state.originalFIR===true){
      this.setState({
        originalFIR:false
      })
    }else{
      this.setState({
        originalFIR:true
      })
    }
  }
  closeOriginal = () => {
    this.setState({
      originalFIR:false
    })
  }
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={3} md={6}>
            <Button
              variant="outlined"
              onClick={this.originalFIR}
            >
              Original FIR
            </Button>
          </Grid>
        </Grid>

        {this.state.originalFIR === true ? (
              <FIRModalOngoing
                firid={this.state.firid}
                close={this.closeOriginal}
              />
            ) : (
              <></>
            )}

      </div>
    );
  }
}

import React, {Component} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Divider, Button, Typography, Grid } from "@material-ui/core";
import "./modal.css";

export default class FIRfile extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
      this.fetch()
  }
  fetch(){
    fetch("http://localhost:7000/api/admin_side/" + this.props.match.params.id, {
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
  }
  render() {
    return (
      <div>
       {this.props.match.params.id}
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
      </div>
    );
  }
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Divider, Button, Typography, Grid } from "@material-ui/core";
import "./modal.css";

const useStyles = makeStyles((theme) => ({
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
}));

export default function TransitionsModal({ close, firid, accept,moreinfo,status,content }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    close();
  };
  const acceptFIR = () => {
    accept(firid);
    close();
  }
  const moreinfoFIR = () => {
    moreinfo(firid);
    close();
  }
 
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h4" id="transition-modal-title">
              FIR ID :{firid}
            </Typography>
            <br></br>
            <Divider />
            <br></br>
            
              <Typography id="transition-modal-description" className="modal-body">
                <Grid spacing={3} container >
                  {content.ipc_sections?<Grid item xs={12}>
                    <Typography variant="h6">AI IPC Sections: {content.ipc_sections.map((element,i) => {
                      console.log(element)
                      return element+", "
                    })}</Typography>
                  </Grid>:null}
                  <Grid item xs={12}>
                    <Typography variant="h6">IPC Sections(As set by SHO): {content.type_of_crime}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Current Status: {content.name}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Name: {content.name}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Email: {content.email}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Father's Name: {content.fathersName}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                  <Typography variant="h6">DOB: {content.DOB}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Mobile number: {content.mobile}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Complainant's Resident Country: {content.country}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Incident District: {content.District}</Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography variant="h6">Incident</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {content.incident}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Reason for Delay(if any)</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {content.delay}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Possible Suspects</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {content.suspects}
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                  <Typography>SHO</Typography>
                    <img
                    src={content.signature}></img>
                  </Grid>

                  <Grid item xs={12}>
                  <Typography>Complainant</Typography>
                    <img
                    src={content.signature_user}></img>
                  </Grid>
                  
                  
                </Grid>
              </Typography>
              <br></br>
              <Divider />
              <br></br>
              <Grid container spacing={3}>
                <Grid item >
                  <Button onClick={acceptFIR} color="primary">
                    Accept
                  </Button>
                </Grid>
                <Grid item >
                  <Button onClick={moreinfoFIR} color="secondary" 
                    disabled = {status === "More information requested"}
                  >
                    Request More Information
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={handleClose}>Close</Button>
                </Grid>
              </Grid>
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

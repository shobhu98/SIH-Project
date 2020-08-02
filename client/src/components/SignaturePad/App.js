import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import "./sigCanvas.css";
import {
  Button,
  TextField,
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
  ThemeProvider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

function App({ closeSignaturePad, rec, open, accorrej }) {
  //closeSignaturePad = closeSignaturePad.bind(this);
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url
  const [type, setType] = useState(null);
  const [submit, setSubmit] = useState(null);
  const [officer, setOfficer] = useState(null);
  //var type="Dowry";
  const sigCanvas = useRef({});
  //const accorrej = accorrej()

  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */

  React.useEffect(() => {
    //console.log(accorrej)
    if (imageURL && type && submit) {

      rec(imageURL, type, officer);
      //console.log(accorrej)
      closeSignaturePad();
    }
  });

  const save = () => {
    if (!imageURL) alert("Please Sign in the white box");
    else if (!type) alert("Please enter Type of crime");
    else if(!officer && accorrej=="accept") alert("Please assign the case to an Investigating Officer")
    else {
      setSubmit(true);
      //open=false
      //closeSignaturePad()
    }
    //imageURL?rec(imageURL):console.log(imageURL);
    //imageURL ? rec(imageURL,type) : console.log("d")
  };

  const styles = makeStyles({
    multilineColor: {
      color: "black",
    },
  });
  const theme = createMuiTheme({
    palette: {
      type: "light",
    },
  });

  const classes = styles();
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Grid>
          <Popup
            modal
            on="focus"
            open={open}
            //onClose={closeSignaturePad()}
            closeOnDocumentClick={false}
            defaultOpen={true}
          >
            {(close) => (
              <>
                <Typography
                  variant="subtitle1"
                  className={classes.multilineColor}
                >
                  Please Sign in the box below
                </Typography>
                <SignaturePad
                  ref={sigCanvas}
                  canvasProps={{
                    className: "signatureCanvas",
                  }}
                  onEnd={() =>
                    setImageURL(
                      sigCanvas.current
                        .getTrimmedCanvas()
                        .toDataURL("image/png")
                    )
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="type"
                  label={
                    accorrej === "accept"
                      ? "Enter IPC Section code(s)"
                      : "Reason for rejection"
                  }
                  autoFocus
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                  InputProps={{
                    className: classes.multilineColor,
                  }}
                />

                {accorrej === "accept" ? (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="officer"
                    type="email"
                    label="Investigating officers email id"
                    
                    onChange={(event) => {
                      setOfficer(event.target.value);
                    }}
                    InputProps={{
                      className: classes.multilineColor,
                    }}
                  />
                ) : null}

                {/* Button to trigger save canvas image */}
                <Button onClick={save} color="primary">
                  Submit
                </Button>
                <Button onClick={clear} color="secondary">
                  Clear
                </Button>
                <Button onClick={closeSignaturePad}>Close</Button>
              </>
            )}
          </Popup>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}
/*
(
        
        <img
          src={imageURL}
          alt="my signature"
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "150px",
          }}
        />
      )
*/
export default App;

import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import "./sigCanvas.css";
import { Button,TextField, makeStyles, MuiThemeProvider, createMuiTheme, ThemeProvider,Grid,Paper, Typography } from "@material-ui/core";

function App({closeSignaturePad, rec, open}) {
  //closeSignaturePad = closeSignaturePad.bind(this);
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url
  const [type, setType] = useState(null);
  const [submit, setSubmit] = useState(null);
  //var type="Dowry";
  const sigCanvas = useRef({});

  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */

  React.useEffect(() => {
    console.log("In use efffect")
    if (imageURL && type && submit){
      rec(imageURL,type)
      console.log("recced")
      closeSignaturePad();

    }
  });

  const save = () => {
    
    if(!imageURL)
      alert("Please Sign in the white box");
    else if (!type)
      alert("Please enter Type of crime");
    else{
      setSubmit(true);
      //open=false
      //closeSignaturePad()
    }
    //imageURL?rec(imageURL):console.log(imageURL);
    //imageURL ? rec(imageURL,type) : console.log("d")
  };

  const styles = makeStyles({
    multilineColor:{
        color:'black'
    }
  });
  const theme=createMuiTheme({
      
    palette: {
      type:"light",
      
      
    }
  
  });

const classes = styles();
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
      <Grid>
      <Popup
        modal
        trigger={<button>Open Signature Pad</button>}
        on="focus"
        open={open}
        //onClose={closeSignaturePad()}
        closeOnDocumentClick={false}
        defaultOpen={true}
      >
        {(close) => (
          
          <>
          <Typography variant="subtitle1" className={classes.multilineColor}>Please Sign in the box below and enter the type of crime</Typography>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas",
              }}
              onEnd={()=>setImageURL((sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")))}
            />
            <TextField
                
                margin="normal"
                required
                fullWidth
                name="type"
                label="Type of Crime"
                
                autoFocus
                onChange={(event) => {
                  setType(event.target.value);
                }}
                InputProps={{
                  className: classes.multilineColor
                }}
              />
            {/* Button to trigger save canvas image */}
            <Button onClick={save} color="primary">Submit</Button>
            <Button onClick={clear} color="secondary">Clear</Button>
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

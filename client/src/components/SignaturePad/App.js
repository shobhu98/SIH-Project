import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import "./App.css";
import "./sigCanvas.css";

function App({closeSignaturePad, rec, open}) {
  //closeSignaturePad = closeSignaturePad.bind(this);
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const save = () => {
    setImageURL((sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")),rec(imageURL));
    //imageURL?rec(imageURL):console.log(imageURL);
  };

  return (
    <div className="App">
      <h1>dsss</h1>
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
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas",
              }}
            />
            {/* Button to trigger save canvas image */}
            <button onClick={save}>Save</button>
            <button onClick={clear}>Clear</button>
            <button onClick={closeSignaturePad}>Close</button>
          </>
        )}
      </Popup>
      <br />
      <br />
      {/* if our we have a non-null image url we should 
      show an image and pass our imageURL state to it*/}
      {imageURL ? (
        
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
      ) : null}
    </div>
  );
}

export default App;

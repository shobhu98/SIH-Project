
// DialogFlow file for running the ChatBot
const express=require('express');
const router=express.Router();
const dialogflow = require('dialogflow');
const  auth=require('../../middleware/auth');
let x={
    station:"",
    name:"",
    fathersName:"",
    notes:"",
    user_status:"",
    DOB:"",
    mobile:"",
    aadhar:"",
    address:"",
    email:"",
    district:"",
    incident:"",
    country:"",
    passport:"",
    FIRNUM:"",
    addrOfCrime:"",
    delay:"",
    suspects:""
};
//for api 1
const  config=require('../../config/dev');
const projectId=config.googleprojectID;
const sessionId=config.dialogFlowSessionID;
const languageCode=config.dialogFlowSessionLanguageCode;


//for api 2

const config2=require('../../config/dagent2');
const  projectId2=config2.googleprojectID;
const sessionId2=config2.dialogFlowSessionID;
const languageCode2=config2.dialogFlowSessionLanguageCode;


//for hindi api 1(api 3)


const config3=require('../../config/dhindiagent1');
const  projectId3=config3.googleprojectID;
const sessionId3=config3.dialogFlowSessionID;
const languageCode3=config3.dialogFlowSessionLanguageCode;


const firdetails=require('../../models/FIRDetails');






// Text Query Route

router.post('/textquery',async function (req,res) {
    // Sending information from client to DialogFlow API
    console.log("here");

    // Create a new chatbot session for interacting with chatbot
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename:"./123.json"
    });
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);




    // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: languageCode,
                },
            },
        };

        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);

         // console.log(result.outputContexts[0].parameters);
         // console.log(result.intent.parameters);
    try{
        if(result.outputContexts[0]!==undefined){
            if(result.outputContexts[0].parameters!==undefined){
                if(result.outputContexts[0].parameters.fields!==undefined){
                    if(result.outputContexts[0].parameters.fields.name!==undefined){
                        console.log(result.outputContexts[0].parameters.fields["name"]);
                        console.log("hello a");
                        x.name=result.outputContexts[0].parameters.fields["name"].stringValue;
                        console.log(x);
                    }
                    if(result.outputContexts[0].parameters.fields.father!==undefined){
                        console.log(result.outputContexts[0].parameters.fields["father"]);
                        console.log("hello a");
                        x.fathersName=result.outputContexts[0].parameters.fields["father"].stringValue;
                        console.log(x);
                    }
                   if(result.parameters.fields.aadharnumber!==undefined){
                        console.log(result.outputContexts[0].parameters.fields["aadharnumber"]);
                        console.log("hello a");
                        x.aadhar=result.outputContexts[0].parameters.fields["aadharnumber"].numberValue;
                        console.log(x);
                    }

                      if(result.outputContexts[0].parameters.fields.address!==undefined){
                        console.log(result.outputContexts[0].parameters.fields["address"]);
                        console.log("hello a");
                        x.address=result.outputContexts[0].parameters.fields.address.listValue.values[0].stringValue;
                        console.log(x);
                    }
                      if(result.outputContexts[0].parameters.fields['email']!==undefined){
                        console.log(result.outputContexts[0].parameters.fields["email"]);
                        console.log("hello a");
                        x.email=result.parameters.fields.email.listValue.values[0].stringValue;
                        console.log(x);
                    }
                      if(result.outputContexts[0].parameters.fields['phone-number']!==undefined){
                        console.log(result.outputContexts[0].parameters.fields["phone-number"]);
                        console.log("hello a");
                        x.mobile=result.outputContexts[0].parameters.fields["phone-number"].stringValue;
                        console.log(x);
                    }

                      if(result.outputContexts[0].parameters.fields["dateofbirth"]!==undefined){
                        console.log(result.outputContexts[0].parameters.fields["dateofbirth"]);
                        console.log("hello a");
                        x.DOB=result.outputContexts[0].parameters.fields["dateofbirth"].stringValue;
                        console.log(x);
                    }
                    if(result.outputContexts[0].parameters.fields["passport"]!==undefined){
                        console.log(result.outputContexts[0].parameters.fields["passport"]);
                        console.log("hello a");
                        x.passport=result.parameters.fields["passport"].stringValue;
                        console.log(x);
                    }
                      if(result.outputContexts[0].parameters.fields["country"]!==undefined){
                        console.log(result.outputContexts[0].parameters.fields["country"]);
                        console.log("hello a");
                        x.country=result.outputContexts[0].parameters.fields["country"].stringValue;
                        console.log(x);
                    }

                    if(result.fulfillmentMessages[0].text.text[0]=== "I have got your personal details. Are you ready to move on to incident details?"){
                        // const user=await User.findById(req.user.id).select('-password');

                        // const fir=new firdetails(x);
                        // const firx=await fir.save();
                        // res.("go to agent 2");
                        console.log("go to agent 2");
                    }



                }
                else{
                    // console.log(result.outputContexts.parameters.fields) ;
                    console.log("aa")
                }


            }
            else {
                // console.log(result.outputContexts.parameters);
                console.log("bb")

            }
        }
    }catch (err) {
        // const fir=new firdetails(x);
        // const firx=await fir.save();
        // res.json(firx);
        console.error("error is coming");


    }






     res.json(result);
    // if(result.fulfillmentText.includes("personal")){
    //          res.redirect('agent2');
    //      }





} );





router.post('/agent2',async function (req,res) {
    // Sending information from client to DialogFlow API
    console.log("here agent 2");
    // Create a new chatbot session for interacting with chatbot
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename:"./agent2.json"
    });
    const sessionPath = sessionClient.sessionPath(projectId2, sessionId2);




    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);


    try{
        if(result.outputContexts[0]!==undefined){
            if(result.outputContexts[0].parameters!==undefined){
                if(result.outputContexts[0].parameters.fields!==undefined){
                    if(result.outputContexts[0].parameters.fields.District!==undefined){
                        console.log(result.outputContexts[0].parameters.fields["District"]);
                        console.log("hello a");
                        x.district=result.outputContexts[0].parameters.fields["District"].stringValue;
                        console.log(x);
                    }
                    if(result.outputContexts[0].parameters.fields['PoliceStation']!==undefined){
                        console.log(result.outputContexts[0].parameters.fields["PoliceStation"]);
                        console.log("hello a");
                        x.station=result.outputContexts[0].parameters.fields["PoliceStation"].stringValue;
                        console.log(x);
                    }
                    if(result.fulfillmentMessages[0].text.text[0]==='Please confirm the exact location at which the crime occurred. This is to ensure that I haven\'t made  any mistakes!'){
                        console.log(result.queryText);
                        console.log("hello a");
                        x.incident=result.queryText;
                        console.log(x);
                    }


                    if(result.fulfillmentMessages[0].text.text[0]==='If you feel there has been some delay in filing this FIR, please state the reason for the same.'){
                        console.log(result.queryText);
                        console.log("hello a");
                        x.addrOfCrime=result.queryText;
                        console.log(x);
                    }


                    if(result.fulfillmentMessages[0].text.text[0]==='Do you have any particular suspects in mind?'){
                        console.log(result.queryText);
                        console.log("hello a");
                        const fir=new firdetails(x);
                        const firx=await fir.save();
                        // x.delay=result.queryText;
                        // console.log(x);


                    }
                    // if(result.fulfillmentMessages[0].text.text[0]==='Do you have any particular suspects in mind?'){
                    //     console.log(result.queryText);
                    //     console.log("hello a");
                    //     x.delay=result.queryText;
                    //     console.log(x);
                    // }


                    // if(result.outputContexts[0].parameters.fields.address!==undefined){
                    //     console.log(result.outputContexts[0].parameters.fields["address"]);
                    //     console.log("hello a");
                    //     x.address=result.outputContexts[0].parameters.fields.address.listValue.values[0].stringValue;
                    //     console.log(x);
                    // }
                    // if(result.outputContexts[0].parameters.fields['email']!==undefined){
                    //     console.log(result.outputContexts[0].parameters.fields["email"]);
                    //     console.log("hello a");
                    //     x.email=result.parameters.fields.email.listValue.values[0].stringValue;
                    //     console.log(x);
                    // }
                    // if(result.outputContexts[0].parameters.fields['phone-number']!==undefined){
                    //     console.log(result.outputContexts[0].parameters.fields["phone-number"]);
                    //     console.log("hello a");
                    //     x.mobile=result.outputContexts[0].parameters.fields["phone-number"].stringValue;
                    //     console.log(x);
                    // }
                    //
                    // if(result.outputContexts[0].parameters.fields["dateofbirth"]!==undefined){
                    //     console.log(result.outputContexts[0].parameters.fields["dateofbirth"]);
                    //     console.log("hello a");
                    //     x.DOB=result.outputContexts[0].parameters.fields["dateofbirth"].stringValue;
                    //     console.log(x);
                    // }
                    // if(result.outputContexts[0].parameters.fields["passport"]!==undefined){
                    //     console.log(result.outputContexts[0].parameters.fields["passport"]);
                    //     console.log("hello a");
                    //     x.passport=result.parameters.fields["passport"].stringValue;
                    //     console.log(x);
                    // }
                    // if(result.outputContexts[0].parameters.fields["country"]!==undefined){
                    //     console.log(result.outputContexts[0].parameters.fields["country"]);
                    //     console.log("hello a");
                    //     x.country=result.outputContexts[0].parameters.fields["country"].stringValue;
                    //     console.log(x);
                    // }


                    // else {
                    //     const fir=new firdetails(x);
                    //     const firx=await fir.save();
                    // }



                }
                else{
                    // console.log(result.outputContexts.parameters.fields) ;
                    console.log("aa")
                }


            }
            else {
                // console.log(result.outputContexts.parameters);
                console.log("bb")

            }
        }
    }catch (err) {
        const fir=new firdetails(x);
        const firx=await fir.save();
        // res.json(firx);
        console.error("error is coming");


    }







    res.send(result);



} );




router.post('/hindi1',async function (req,res) {
    // Sending information from client to DialogFlow API
    // console.log("here agent 2");
    // Create a new chatbot session for interacting with chatbot
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename:"./hindiagent1.json"
    });
    const sessionPath = sessionClient.sessionPath(projectId3, sessionId3);




    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result);



} );





module.exports=router;


// DialogFlow file for running the ChatBot
const express=require('express');
const router=express.Router();
const dialogflow = require('dialogflow');
const  auth=require('../../middleware/auth');

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
        // console.log(`  Query: ${result.queryText}`);
        // console.log(`  Response: ${result.fulfillmentText}`);

        console.log(result.outputContexts.parameters);



    res.json(result);
    // if(result.fulfillmentText.includes("personal")){
    //          res.redirect('agent2');
    //      }





} );





router.get('/agent2',auth,async function (req,res) {
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

    res.send(result);



} );




router.post('/hindi1',auth,async function (req,res) {
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

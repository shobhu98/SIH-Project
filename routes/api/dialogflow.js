const express=require('express');
const router=express.Router();
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const  config=require('../../config/dev');
const projectId=config.googleprojectID;
const sessionId=config.dialogFlowSessionID;
const languageCode=config.dialogFlowSessionLanguageCode;
const {Storage} = require('@google-cloud/storage');






// Create a new session
const sessionClient = new dialogflow.SessionsClient({
    keyFilename:"./123.json"
});
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// Text Query Route

router.post('/textquery',async function (req,res) {
    // Sending information from client to Dialogflow API
    console.log("here");



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

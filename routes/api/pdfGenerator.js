const puppeteer=require('puppeteer');
const express=require('express');
const router=express.Router();


router.post('/',async function (req,res) {

    try{
        const browser=await puppeteer.launch({ignoreHTTPSErrors: true,
            
            });
        const page=await  browser.newPage();
        console.log(req.body.html)
        await page.setContent(req.body.html)
        await page.emulateMediaType('screen');
        //await page.emulateMediaType('print');
        //await page.goto('http://localhost:3000/', {waitUntil : 'networkidle0'});
        await page.pdf({
            path:'testing.pdf',
            
            printBackground:true
        });
        var buffer = await page.pdf({
            path:'testing.pdf',
            
            printBackground:true
        });

        await browser.close();
        
        //process.exit();
        res.end(buffer)

    }catch (err) {
        console.log(err);

    }



});
module.exports=router;

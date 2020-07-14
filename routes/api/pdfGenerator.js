const puppeteer=require('puppeteer');
const express=require('express');
const router=express.Router();


router.get('/',async function (req,res) {

    try{
        const browser=await puppeteer.launch();
        const page=await  browser.newPage();

        await page.setContent('<h1>Testing the pdf API</h1>')
        await page.emulateMediaType('screen');
        await page.pdf({
            path:'testing.pdf',
            format:'A4',
            printBackground:true
        });
        await browser.close();
        process.exit();
    }catch (err) {
        console.log(err);

    }



});
module.exports=router;

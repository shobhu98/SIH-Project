// routes for accessing FIR by the admin

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const FIRDetails = require("../../models/FIRDetails");

// @route  GET api/admin_side
// @desc   GET all FIR
// @access  Private
// each FIR has a UIN(Unique Identification Number) . Every police station will be able to access only those FIR that matches with their Number
// all FIR's are then sorted based on latest FIR's
router.put(
  "/fir",
  auth,
  [check("uin", "uin should exist").exists()],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const fir = await FIRDetails.find({ UIN: req.body.uin }).sort({
        date: -1,
      });
      res.json(fir);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  GET api/admin_side/:id
// @desc   GET post by id
// @access  Private
// This API  is for unique FIR. Every time the police clicks on a FIR all the details of that will be displayed on the portal
router.get("/:st", auth, async function (req, res) {
  try {
    console.log("hello there");

    const fir = await FIRDetails.findById(req.params.st);

    if (!fir) {
      return res.status(404).json({ msg: "FIR Not found" });
    }
    res.json(fir);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/:id",
  auth,
  [
    //   check('acceptance','should be 0 or 1').not().isEmpty(),
    //   check('type_of_crime','please mention the type of crime').not().isEmpty(),
    //   check('signature',"signature must exist").not().isEmpty()
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    console.log(req.params);
    const { spam } = req.body;

    try {
      let fir = await FIRDetails.findById(req.params.id);

      const update = {
        $set: {
          spam: spam,
        },
      };

      if (fir) {
        //Update
        // console.log(fir);
        fir = await FIRDetails.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body }
          // {new:false}
        );
        console.log(fir);
        await fir.save();
      }

      // fir=new FIRDetails(acceptance);

      res.json(fir);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.patch(
  "/spam/:id",
  auth,
  [
    //   check('acceptance','should be 0 or 1').not().isEmpty(),
    //   check('type_of_crime','please mention the type of crime').not().isEmpty(),
    //   check('signature',"signature must exist").not().isEmpty()
  ],
  
);


router.patch(
    "/moreinfo/:id",
    auth,
    [
      //   check('acceptance','should be 0 or 1').not().isEmpty(),
      //   check('type_of_crime','please mention the type of crime').not().isEmpty(),
      //   check('signature',"signature must exist").not().isEmpty()
    ],
    async function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log(req.body);
      console.log(req.params);
      const { more_info,acceptance } = req.body;
  
      try {
        let fir = await FIRDetails.findById(req.params.id);
  
        const update = {
          $set: {
            more_info: more_info,
            acceptance:acceptance
          },
        };
  
        if (fir) {
          //Update
          // console.log(fir);
          fir = await FIRDetails.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body }
            // {new:false}
          );
          console.log(fir);
          await fir.save();
        }
  
        // fir=new FIRDetails(acceptance);
  
        res.json(fir);
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
      }
    }
  );

module.exports = router;

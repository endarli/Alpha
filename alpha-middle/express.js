var express = require('express');
var router = express.Router();
const cors = require("cors");

//Middleware
router.use(express.json()); //Allows the use of middleware in the request pipeline
router.use(cors({
    origin: "*"
})); // Allows requests from other localhost proccesses

// Import SQL Service
const sqlService = require("./services/sql-service");
const vals = require("./validations/women");

// GET Woman by First Letter of Her Name
router.get("/women/:letter", async (req, res) => {

  try {
      // Validation
      const { error } = vals.fLetterSchema.validate(req.params);

      if (error) {
          return res.status(400).send(error.details[0].message).end();
      }

      // Access Letter From Params
      let letter = req.params.letter;

      // Get Woman
      let woman = await sqlService.selectWomanByLetter(letter)

      // Handle Result
      if (woman) {
          res.status(200).send(woman);
      } else {
          res.status(500).send("Error retrieving woman.");
      }

  } catch(e) {
      res.status(500).send();
  }
});

// Create Woman
router.post("/woman", async (req, res) => {
  try {
      // Validation
      const { error } = vals.womanCreateSchema.validate(req.body);

      if (error) {
          return res.status(400).send(error.details[0].message).end();
      }

      //Access Creation Vars from Params
      let letter = req.body.letter;
      let name = req.body.name;
      let parrafo = req.body.parrafo;
      let date = req.body.date;

      // Make Record
      let record = await sqlService.insertWoman(letter, name, parrafo, date);

      // Handle Result
      if (record) {
          res.status(200).send("Woman was added!");
      } else {
          res.status(500).send("Error adding woman.");
      }
  } catch(e) {
      console.log(e);
      res.status(500).send();
  }
});

module.exports = router;
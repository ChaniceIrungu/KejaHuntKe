var express = require("express");
var router = express.Router();
const db = require("../model/helper");

getAllApartments = (req, res, next) => {
  db("SELECT * FROM apartments;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
};

// GET appartment list
router.get("/", getAllApartments);

// GET one student
router.get("/:id", function (req, res, next) {
  //your code here
  const { id } = req.params;
  db(`SELECT * FROM apartments WHERE id = ${id};`)
    .then((results) => {
      res.send(results.data[0]);
    })
    .catch((err) => res.status(500).send(err));
});
// INSERT a new apartment into the DB
router.post("/", function (req, res, next) {
  //your code here
  const { location, number_of_bedrooms, parking_space } = req.body;
  db(
    `INSERT INTO apartments(location,
      number_of_bedrooms,
      parking_space
      ) VALUES ("${location}",
        "${number_of_bedrooms}",
        "${parking_space}");`
  )
    .then(() => {
      getAllApartments(req, res);
    })
    .catch((err) => res.status(500).send(err));
});

// DELETE an apartment from the DB
router.delete("/:id", function (req, res, next) {
  //your code here
  const { id } = req.params;
  db(`DELETE FROM apartments WHERE id = ${id};`)
    .then((results) => {
      res.send({ msg: "your data was deleted correctly" });
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;

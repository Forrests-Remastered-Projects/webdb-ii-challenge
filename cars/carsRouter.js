const express = require("express");
const db = require("../data/db");
const Cars = require("./carsModel");
const router = express.Router();

router.get("/", (req, res) => {
  Cars.get().then(cars => res.status(200).json(cars));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Cars.getById(id).then(car => {
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).end();
    }
  });
});

router.post("/", (req, res) => {
  const { make, model, vin, mileage, transmission, status } = req.body;
  Cars.insert({ make, model, vin, mileage, transmission, status })
    .then(car => {
      console.log(car);
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Error inserting car", message: err.message });
    });
});
router.put("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;

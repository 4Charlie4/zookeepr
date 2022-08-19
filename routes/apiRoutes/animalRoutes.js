const router = require("express").Router();
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require("../../lib/animals");
const { animals } = require("../../data/animals");

router.get("/animals", (req, res) => {
  //allows users to make a GET request using a query parameter
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get("/animals/:id", (req, res) => {
  //allows users to make a GET request using ID to retrieve a certain object
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

router.post("/animals", (req, res) => {
  //sets id based on what the index of the array should be (the length property is always one number ahead if the last index of an array hence why this works)
  //works as long as no data is removed from array
  req.body.id = animals.length.toString();

  if (!validateAnimal(req.body)) {
    res.status(400).send("The animal is not properly formatted.");
  } else {
    const animal = createNewAnimal(req.body, animals);

    res.json(animal);
  }
});

module.exports = router;

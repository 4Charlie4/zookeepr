const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require("../lib/animals");
const { animals } = require("../data/animals");

jest.mock("fs");

test("creates animal object", () => {
  const animal = createNewAnimal({ name: "Roach", id: "123213" }, animals);

  expect(animal.name).toBe("Roach");
  expect(animal.id).toBe("123213");
});

test("filters by query", () => {
  const animalsToFilter = [
    {
      id: "1",
      name: "Monk",
      species: "Monkey",
      diet: "Omnivore",
      personalityTraits: ["zany", "goofy"],
    },
    {
      id: "2",
      name: "Roach",
      species: "Dog",
      diet: "omnivore",
      personalityTraits: ["goofy", "hungry"],
    },
  ];
  const filteredAnimals = filterByQuery(
    { personalityTraits: ["zany"] },
    animalsToFilter
  );

  expect(filteredAnimals.length).toEqual(1);
});

test("validate animal", () => {
  const animal = {
    id: "3",
    name: "Barney",
    species: "Gorilla",
    diet: "omnivore",
    personalityTraits: ["strong"],
  };

  const invalidAnimal = {
    id: "4",
    name: "Rov",
    species: "cat",
    diet: "carnivore",
  };

  const valid = validateAnimal(animal);
  const invalid = validateAnimal(invalidAnimal);

  expect(valid).toBe(true);
  expect(invalid).toBe(false);
});

test("find by id", () => {
  const animal = [
    {
      id: "5",
      name: "Mel",
      species: "Rat",
      diet: "Herbivore",
      personalityTraits: ["crazy"],
    },
    {
      id: "6",
      name: "Arya",
      species: "fish",
      personalityTraits: ["sneaky"],
    },
  ];

  const result = findById("5", animal);
  expect(result.name).toBe("Mel");
});

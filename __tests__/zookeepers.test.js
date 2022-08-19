const fs = require("fs");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers");

jest.mock("fs");

test("filters by query", () => {
  const zookeeperToFilter = [
    {
      id: "1",
      name: "Jeff",
      age: 30,
      favoriteAnimal: "Polar Bear",
    },
    {
      id: "2",
      name: "Jill",
      age: 35,
      favoriteAnimal: "Lion",
    },
  ];
  const filteredZookeeper = filterByQuery(
    { favoriteAnimal: "Lion" },
    zookeeperToFilter
  );

  expect(filteredZookeeper.length).toEqual(1);
});

test("find by id", () => {
  const zookeeper = [
    {
      id: "3",
      name: "Bob",
      age: 25,
      favoriteAnimal: "Bobcat",
    },
    {
      id: "4",
      name: "Luisa",
      age: 22,
      favoriteAnimal: "Giraffe",
    },
  ];

  const result = findById("3", zookeeper);
  expect(result.name).toBe("Bob");
});

test("create zookeeper Object", () => {
  const zookeeper = createNewZookeeper(
    { name: "John Doe", id: "34" },
    zookeepers
  );

  expect(zookeeper.name).toBe("John Doe");
  expect(zookeeper.id).toBe("34");
});

test("Validates zookeeper age", () => {
  const validZookeeper = {
    id: "5",
    name: "Mike",
    age: 60,
    favoriteAnimal: "Crocodile",
  };

  const invalidZookeeper = {
    id: "6",
    name: "Jane",
    age: "25",
    favoriteAnimal: "Manatee",
  };

  const valid = validateZookeeper(validZookeeper);
  const invalid = validateZookeeper(invalidZookeeper);

  expect(valid).toBe(true);
  expect(invalid).toBe(false);
});

const Person = require("../models/personModel");

module.exports = () => {
  // brought you by the most popular gender neutral names for 2020 random article
  const firstNames = [
    "Charlie",
    "Finley",
    "Skyler",
    "Justice",
    "Royal",
    "Jane"
  ];
  // this is just a continuation of the list
  const middleNames = [
    "Oakley",
    "Lennon",
    "Armani",
    "Azariah",
    "Robin",
    "Smith"
  ];
  const lastNames = ["Cypress", "Indiana", "Ridley", "Storm", "Ocean", "Doe"];

  // for loop because we want the indices
  for (let i = 0; i < firstNames.length; i += 1) {
    let human = new Person({
      firstName: firstNames[i],
      middleName: middleNames[i],
      lastName: lastNames[i]
    });
    human.save();
  }
  console.log("~* db populated *~");
};

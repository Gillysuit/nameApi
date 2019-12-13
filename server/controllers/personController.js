const Person = require("../models/personModel");

module.exports = personController = {
  // get a random person
  getAFirstName: (req, res, next) => {
    Person.countDocuments({}, (err, count) => {
      let random = Math.floor(Math.random() * count);

      Person.findOne()
        .skip(random)
        .exec((err, result) => {
          res.locals.firstName = [result.id, result.firstName];
          next();
        });
    });
  },

  // get the middle with an ID
  getAMiddleName: (req, res, next) => {
    const id = req.body._id;
    Person.findById({ _id: id }, (err, result) => {
      res.locals.middleName = result.middleName;
      next();
    });
  },

  // get the last with a middle name
  getALastName: (req, res, next) => {
    const middleName = req.body.middleName;
    Person.find({ middleName: middleName }, (err, result) => {
      console.log(result, "<~result");
      res.locals.lastName = result[0].lastName;
      next();
    });
  }
};

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
  }
};

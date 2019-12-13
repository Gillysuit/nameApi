const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
  // unique prevent initial duplicates
  firstName: { type: String, required: true, unique: true },
  middleName: { type: String, require: true },
  lastName: { type: String, required: true },
  age: Number,
  birthday: Date
});

module.exports = mongoose.model("Person", personSchema);

const { Schema, model } = require("mongoose");

const enterpriseSchema = new Schema({
  name: String,
  bucket: String,
});

module.exports = model("Enterprise", enterpriseSchema);
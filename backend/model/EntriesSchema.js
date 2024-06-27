const mongoose = require("mongoose");

const entriesSchema = new mongoose.Schema(
{
user: { type: String },
password: { type:String},
},
{
collection: "test1",
}
);

module.exports = mongoose.model("test1", entriesSchema);

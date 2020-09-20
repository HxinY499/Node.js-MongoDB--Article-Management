var mongoose = require("mongoose")
var Schema = mongoose.Schema
var workSchema = new Schema({
    title: String,
    content: String,
    username: String,
    time: String
})

var workModel = new mongoose.model("works", workSchema)

module.exports = workModel
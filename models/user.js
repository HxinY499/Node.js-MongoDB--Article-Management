var mongoose = require("mongoose")
var Schema = mongoose.Schema
var userSchema = new Schema({
    username: String,
    password: String
})

var userModel = new mongoose.model("users", userSchema)
    // userModel.create({ username: "user2", password: "jay499" }, function(err, doc) {
    //     console.log(doc)
    // })
module.exports = userModel
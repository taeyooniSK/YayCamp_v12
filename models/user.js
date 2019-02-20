const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password : String
});

userSchema.plugin(passportLocalMongoose); // local mongoose plugin gives all the methods and important functionalities to user model

module.exports = mongoose.model("User", userSchema);
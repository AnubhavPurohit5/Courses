const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/my").then(() => {
  console.log("connected to mongodb");
});

const adminschema = new mongoose.Schema({
  username: String,
  password: String,
});
const userschema = new mongoose.Schema({
  username: String,
  password: String,
  purchasecourse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
const courseschema = new mongoose.Schema({
  title: String,
  price: Number,
  imageLink: String,
  description: String,
});
const User = mongoose.model("user", userschema);
const Admin = mongoose.model("admin", adminschema);
const Course = mongoose.model("course", courseschema);

module.exports = {
  User,
  Admin,
  Course,
};

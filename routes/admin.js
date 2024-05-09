const express = require("express");
const adminMiddleware = require("../middleware/admin");
const router = express.Router();
const { Admin, Course } = require("../db/index");

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // check user with this
  await Admin.create({
    username: username,
    password: password,
  });
  res.send("Admin created successfully");
});

router.post("/course", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  let newcourse = await Course.create({
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  });
  //   console.log(newcourse);
  res.json({
    msg: "course added",
    courseid: newcourse._id,
  });
});
router.get("/course", async (req, res) => {
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});
module.exports = router;

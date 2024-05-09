const express = require("express");
const router = express.Router();
const usermiddle = require("../middleware/user");
const { User, Course } = require("../db");

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    await User.create({
      username,
      password,
    });
    res.send("bangaya tu user");
  } catch (err) {
    ("nhi");
  }
});

router.get("/courses", async (req, res) => {
  const response = await User.find({});
  res.json({
    courses: response,
  });
});
router.post("/courses/:courseId", usermiddle, async (req, res) => {
  const courseid = req.params.courseId;
  const username = req.headers.username;
  try {
    await User.updateOne(
      {
        username: username,
      },
      {
        $push: {
          purchasecourse: courseid,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
  res.json({
    msg: "purchase hogaya!",
  });
});

router.get("/purchase", usermiddle, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });
  console.log(user.purchasecourse);
  const course = await Course.find({
    _id: {
      $in: user.purchasecourse,
    },
  });
  res.json({
    course: course,
  });
});
module.exports = router;

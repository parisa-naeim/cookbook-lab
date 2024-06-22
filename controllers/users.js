const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// router logic will go here - will be built later on in the lab

module.exports = router;

router.get("/", async (req, res) => {
  const allUsers = await User.find();
  res.render("users/index.ejs", { users: allUsers });
});


// show
router.get("/:id", async (req, res) => {
    const userInDb = await User.findById(req.params.id);
    res.render("users/show.ejs", { communityUser: userInDb });
  });
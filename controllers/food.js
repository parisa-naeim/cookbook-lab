const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// router logic will go here - will be built later on in the lab

module.exports = router;

router.get("/", async (req, res) => {
  const userInDb = await User.findById(req.session.user._id);
  res.render("foods/index.ejs", { pantry: userInDb.pantry });
});

// new page
router.get("/new", (req, res) => {
  res.render("foods/new.ejs");
});

// create
router.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.push(req.body);
    await user.save();
    res.redirect("foods");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.pull(req.body);
    await user.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// show
router.get("/:id", async (req, res) => {
  const userInDb = await User.findById(req.session.user._id);
  const food = userInDb.pantry.filter((item) => item._id == req.params.id);
  res.render("foods/show.ejs", { food: food[0] });
});

router.get("/:id/edit", async (req, res) => {
  try {
    const userInDb = await User.findById(req.session.user._id);
    const food = userInDb.pantry.filter((item) => item._id == req.params.id);
    res.render("foods/edit.ejs", {
      food: food[0],
    });
  } catch (error) {
    console.log(error);
    res.redirect("/foods");
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const index = user.pantry.findIndex((item) => item._id == req.params.id);
    user.pantry[index].name = req.body.name;
    await user.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.session.user._id}/foods`);
  }
});

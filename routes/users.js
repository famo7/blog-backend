const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    author: 1,
    id: 1,
    title: 1,
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const body = req.body;

  const passwordHash = await bcrypt.hash(body.password, 10);

  const user = new User({
    name: body.name,
    username: body.username,
    password: passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = router;

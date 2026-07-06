const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Register User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hashedPassword
  });

  res.redirect("/login");
});

// Login User
// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.send("User not found");

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.send("Wrong password");

  req.session.userId = user._id;

  // Unlock First Login achievement
  if (!user.achievements.includes("First Login")) {
    user.achievements.push("First Login");
    await user.save();
  }

  res.redirect("/dashboard");
});

// Dashboard
router.get("/dashboard", async (req, res) => {

  if (!req.session.userId)
    return res.redirect("/login");

  const user = await User.findById(req.session.userId);

  res.render("dashboard", { user });
});

// Tic Tac Toe
router.get("/tictactoe", (req, res) => {
  res.render("tictactoe");
});

// Reward Coins
router.post("/reward", async (req, res) => {

  if (!req.session.userId)
    return res.status(401).json({ message: "Login required" });

  const { coins } = req.body;

  await User.findByIdAndUpdate(
    req.session.userId,
    { $inc: { coins: coins } }
  );

  res.json({
    success: true
  });
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// Leaderboard
router.get("/leaderboard", async (req, res) => {

    if (!req.session.userId)
      return res.redirect("/login");
  
    const users = await User.find().sort({ coins: -1 });
  
    res.render("leaderboard", { users });
  
  });

  // Daily Reward
router.post("/dailyreward", async (req, res) => {

  if (!req.session.userId) {
      return res.json({
          success: false,
          message: "Please login."
      });
  }

  const user = await User.findById(req.session.userId);

  const now = new Date();

  if (user.lastReward) {

      const diff = now - user.lastReward;

      const hours = diff / (1000 * 60 * 60);

      if (hours < 24) {

          return res.json({
              success: false,
              message: "Come back tomorrow!"
          });

      }

  }

  user.coins += 50;
  user.lastReward = now;

  await user.save();

  res.json({
      success: true,
      coins: user.coins
  });

});

// Profile Page
router.get("/profile", async (req, res) => {

  if (!req.session.userId) {
      return res.redirect("/login");
  }

  const user = await User.findById(req.session.userId);

  res.render("profile", { user });

});

router.get("/snake", (req, res) => {
  res.sendFile(require("path").join(__dirname, "../public/games/snake.html"));
});

router.post("/snake/score", async (req, res) => {

  if (!req.session.userId) {
      return res.json({ success: false });
  }

  const { score } = req.body;

  const user = await User.findById(req.session.userId);

  user.gamesPlayed += 1;
  user.coins += score * 5;
  user.xp += score * 2;

  if (score > user.highScore) {
      user.highScore = score;
  }

  await user.save();

  res.json({
      success: true
  });

});

// Settings Page
router.get("/settings", async (req, res) => {

  if (!req.session.userId) {
      return res.redirect("/login");
  }

  const user = await User.findById(req.session.userId);

  res.render("settings", { user });

});

const path = require("path");

router.get("/sudoku", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/games/sudoku.html"));
});

router.get("/achievements", async (req, res) => {

  if (!req.session.userId)
      return res.redirect("/login");

  const user = await User.findById(req.session.userId);

  res.render("achievements", { user });

});


module.exports = router;
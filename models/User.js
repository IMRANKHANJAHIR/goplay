const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  coins: {
    type: Number,
    default: 100
  },

  gamesPlayed: {
    type: Number,
    default: 0
  },

  wins: {
    type: Number,
    default: 0
  },

  losses: {
    type: Number,
    default: 0
  },

  level: {
    type: Number,
    default: 1
  },

  xp: {
    type: Number,
    default: 0
  },

  highScore: {
    type: Number,
    default: 0
  },

  achievements: {
    type: [String],
    default: []
  },

  lastReward: {
    type: Date,
    default: null
  }

});

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    maxLength: 100,
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  RefreshTokens: {
    type: [String],
    default: []
  }
});


module.exports = mongoose.model("users", userSchema);

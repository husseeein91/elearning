const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Student"],
    default: "Student",
  },
  level: {
    type: String,
    enum: ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"],
    required: true,
  },
  stage: {
    type: String,
    enum: ["Primary", "Preparatory", "Secondary"],
    required: true,
  },
  mothersPhone: {
    type: String,
    required: true,
    unique: true,
  },
  fathersPhone: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  center: {
    type: String,
  },
  school: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "Banned"],
    default: "Banned",
  },
  balance: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Student = mongoose.model("student", StudentSchema);

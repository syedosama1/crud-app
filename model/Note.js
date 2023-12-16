const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [ 'email', 'password', 'number', 'date'], // Valid input types
  },
  placeholder: {
    type: String,
    required: true,
  },
});

const noteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
    // Password validation - at least 8 characters, at least one uppercase letter, one lowercase letter, and one number
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  },
  number: {
    type: Number,
    required: true,
    // Number validation - must be a positive integer
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value.',
    },
  },
  date: {
    type: Date,
    default: Date.now,
    // Date validation - must be a valid date
    validate: {
      validator: (value) => value instanceof Date && !isNaN(value),
      message: 'Invalid date.',
    },
  },
  inputs: {
    type: [inputSchema],
    validate: [(inputs) => inputs.length <= 20, '{PATH} exceeds the limit of 20'],
  },
});

mongoose.models = {};
module.exports = mongoose.model('Notes', noteSchema);

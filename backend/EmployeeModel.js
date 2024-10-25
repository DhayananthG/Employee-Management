const mongoose = require('mongoose');

// Define the Employee Schema
const EmployeeSchema = new mongoose.Schema({
  EmployeeID: {
    type: String,
    required: true,
    unique: true
  },
  EmployeeName: {
    type: String,
    required: true
  },
  Designation: {
    type: String,
    required: true
  },
  Department: {
    type: String,
    required: true
  },
  JoiningDate: {
    type: Date,
    required: true
  }
});


const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;

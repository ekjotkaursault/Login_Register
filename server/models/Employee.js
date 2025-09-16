// Import mongoose to work with MongoDB
const mongoose = require('mongoose');

// Define a schema (structure) for the Employee collection
// Each employee will have a name, email, and password
const EmployeeSchema = new mongoose.Schema({
  name: String,     // store employee's name
  email: String,    // store employee's email address
  password: String, // store employee's password
});

// Create a model based on the schema
// 'employees' will be the collection name in MongoDB
const EmployeeModel = mongoose.model('employees', EmployeeSchema);

// Export the model so it can be used in other files
module.exports = EmployeeModel;

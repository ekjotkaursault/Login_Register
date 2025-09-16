const mongoose = require("mongoose");

// Define the schema (structure) for our employees collection
const EmployeeSchema = new mongoose.Schema({
  // Username of the employee (required)
  name: { type: String, required: true },   // this is the username

  // Email must be unique so no duplicate accounts
  email: { type: String, required: true, unique: true },

  // Password is also required
  password: { type: String, required: true }
});

// Create a model called "employees" using the schema
// This will map to the "employees" collection in MongoDB
const EmployeeModel = mongoose.model("employees", EmployeeSchema);

// Export the model so other files (like server routes) can use it
module.exports = EmployeeModel;

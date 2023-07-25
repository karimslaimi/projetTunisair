// seedDatabase.js
const mongoose = require('mongoose');
const User = require('../models/User.model'); // Import the User model
const bcrypt = require("bcryptjs")
async function seedDatabase() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect('mongodb://localhost:27017/tunisair', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Insert the initial data into the database
    const user= new User({
        userName:"admin",
        email:"admin@admin.com",
        password:bcrypt.hashSync("admin123"),
        role:"ADMIN"

    })
    await user.save();

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Run the seedDatabase function
seedDatabase();

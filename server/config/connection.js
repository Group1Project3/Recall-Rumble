// Load the Mongoose ORM
const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/RecallRumble', // MongoDB connection URI
  {
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true, // Use new server discovery and monitoring engine
    useCreateIndex: true, // Ensure indexes are created for unique fields
    useFindAndModify: false, // Disable findOneAndUpdate and findOneAndRemove as they are deprecated
  }
);

// Export the Mongoose connection
module.exports = mongoose.connection;

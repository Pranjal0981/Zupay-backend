const mongoose = require('mongoose');

// Define the schema for blog posts
const PostSchema = new mongoose.Schema({
  // Title of the post
  title: {
    type: String,
    required: [true, 'Title is required'], // Title is mandatory
    trim: true, // Removes any leading or trailing whitespace
    maxlength: [100, 'Title cannot be more than 100 characters'], // Restrict title length
  },
  // Short summary or excerpt of the post
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'], // Excerpt is mandatory
    trim: true, // Removes any leading or trailing whitespace
    maxlength: [200, 'Excerpt cannot be more than 200 characters'], // Restrict excerpt length
  },
  // Main content of the post
  content: {
    type: String,
    required: [true, 'Content is required'], // Content is mandatory
  },
  // Timestamp of when the post was created
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date and time
  },
});

// Export the Post model based on the schema
module.exports = mongoose.model('Post', PostSchema);

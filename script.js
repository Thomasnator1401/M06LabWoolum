// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

// Define Course schema
const CourseSchema = new mongoose.Schema({
  name: String,
  description: String,
  teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

// Define Course model
const Course = mongoose.model('Course', CourseSchema);

// Initialize Express app
const app = express();

// Use JSON middleware
app.use(express.json());

// Define routes
app.get('/courses', function(req, res) {
  // Get all courses from the database
  Course.find({}, function(err, courses) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(courses);
    }
  });
});

app.get('/courses/:id', function(req, res) {
  // Get a single course by its id
  Course.findById(req.params.id, function(err, course) {
    if (err) {
      res.status(500).send(err);
    } else if (!course) {
      res.status(404).send('Course not found');
    } else {
      res.json(course);
    }
  });
});

app.post('/courses', function(req, res) {
  // Create a new course from the request body
  const course = new Course(req.body);
  course.save(function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(course);
    }
  });
});

app.put('/courses/:id', function(req, res) {
  // Update an existing course by its id
  Course.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, course) {
    if (err) {
      res.status(500).send(err);
    } else if (!course) {
      res.status(404).send('Course not found');
    } else {
      res.json(course);
    }
  });
});

app.delete('/courses/:id', function(req, res) {
  // Delete a course by its id
  Course.findByIdAndDelete(req.params.id, function(err, course) {
    if (err) {
      res.status(500).send(err);
    } else if (!course) {
      res.status(404).send('Course not found');
    } else {
      res.json(course);
    }
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});

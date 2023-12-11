// Require the express module and create an express app
const express = require('express');
const app = express();

// Require the mongoose module and connect to the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/courses', {useNewUrlParser: true, useUnifiedTopology: true});

// Define a schema and a model for the Course collection
const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  instructor: String,
  duration: Number
});

const Course = mongoose.model('Course', courseSchema);

// Create a route for adding a new course
app.post('/courses', (req, res) => {
  // Get the data from the request body
  const name = req.body.name;
  const description = req.body.description;
  const instructor = req.body.instructor;
  const duration = req.body.duration;

  // Create a new course object using the data
  const newCourse = new Course({
    name: name,
    description: description,
    instructor: instructor,
    duration: duration
  });

  // Save the new course to the database
  newCourse.save((err, course) => {
    if (err) {
      // If there is an error, send a 500 status code and a message
      res.status(500).send('Something went wrong');
    } else {
      // If the save is successful, send a 201 status code and the course object
      res.status(201).send(course);
    }
  });
});

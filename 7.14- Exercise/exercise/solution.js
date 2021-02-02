/*
* Exercise
* 1. Get all the published backend courses
* 2. Sort them by their name
* 3. pick only their name and author and display them
* **/

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connect to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB"));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  const courses = await Course
    .find({ isPublished: true, tags: { $in: ["backend"] } })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 })

  return courses;
}

async function run() {
  const result = await getCourses();
  console.log(result);
}

run();

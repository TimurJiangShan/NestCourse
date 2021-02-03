const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connect to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB"));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now},
  isPublished: Boolean,
  price: Number,
})

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  const courses = await Course
    .find({ isPublished: true})
    .or([{ price: { $gte: 15 }}, { name: /.*by.*/ }])
  return courses;
}

async function run() {
 console.log(await getCourses());
}

run();

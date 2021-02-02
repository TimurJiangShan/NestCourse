const mongoose = require("mongoose");

// connect 方法返回一个promise
mongoose.connect("mongodb://localhost/playground")
  .then(() => console.log("Connect to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB"));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// 开头大写： class
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["js", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// select: 在这个例子中，我只想要name和tags这两个属性
// find方法是用来做filter的
/*
* 1. Comparison Query Operators
* eq : equal
* ne: not equal
* gt: greater than
* gte: greater than or equal to
* lt: less than
* lte: less than or equal to
* in:
* nin: not in
*
* 2. Logical Query Operators
* **/
async function getCourses() {

  const courses = await Course
    // .find({ author: 'Mosh', isPublished: true })
    // .find({ price: 10})
    // .find({ price: { $gt: 10, $lte: 20}}) // 这种方法用来写大于，小于等于之类的, 小于 && 大于
    // .find({ price: { $in: [10, 15, 20] } }) // 用数组来做枚举
    .find()
    .or([{author: "Mosh"} ,{ isPublished: true}]) // 查询author === Mosh 或者 isPublished === true 的项目
    .limit(10)
    .sort({ name: 1})
    .select({ name: 1, tags: 1 });
  console.log(courses);
}


// createCourse();
getCourses();



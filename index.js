const mongoose = require("mongoose");

// connect 方法返回一个promise
mongoose.connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connect to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB"));


/*
* MongoDB 的基本单位是 Collection和document
*
* */
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now},
  isPublished: Boolean,
  price: Number,
  _id: String, // 这里的ID要显式的写出来
})

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

  const pageNumber = 2;
  const pageSize = 10;
  // /api/courses?pageNumber=2&pageSize=10
  const courses = await Course
    // .find({ author: 'Mosh', isPublished: true })
    // .find({ price: 10})
    // .find({ price: { $gt: 10, $lte: 20}}) // 这种方法用来写大于，小于等于之类的, 小于 && 大于
    // .find({ price: { $in: [10, 15, 20] } }) // 用数组来做枚举
    // .find()
    // .or([{author: "Mosh"} ,{ isPublished: true}])i // 查询author === Mosh 或者 isPublished === true 的项目
    // .and([{author: "Mosh"},{ isPublished: true}])
    // .find({ author: /^Mosh/ }) // Starts with Mosh
    // .find({ author: /Hamedani$/i}) // Ends with Hamedani : 大小写敏感， 在末尾加i可以大小写不敏感
    // .find({ author: /.*Mosh.*/i}) // .*sh.* 匹配0-多个 包含sh的子项 before or after
    // .limit(10)
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .find()
    .sort({ name: 1})
    // .select({ name: 1, tags: 1 });
    // .count()
  console.log(courses);
}


// createCourse();
// getCourses();

// Approach: Query First
// 1. findById()
// 2. Modify its properties
// 3. save()


// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) console.log(course);
//
//   course.isPublished = true;
//   course.author = "Another Author";
//
//   const result = await course.save();
//   console.log(result);
//   console.log(11);
// }

// Approach: Update First
// 1. Update directory
// 2. Optionally: get the updated document

async function updateCourse(id) {
  const course = await Course.updateMany({ _id: id}, {
    $set: {
      author: "Mosh-upd",
      isPublished: true
    }
  });

  const result = course;
  console.log(result);
}
// updateCourse('5a68fde3f09ad7646ddec17e');
// getCourses()

async function removeCourse(id) {
  const course = await Course.findByIdAndRemove({ _id: id});
  console.log(course);
}

removeCourse('5a68fdf95db93f6477053ddd');

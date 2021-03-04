const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports.Blog = mongoose.model("blog", blogSchema);
module.exports.blogSchema = blogSchema;

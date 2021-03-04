const jwt = require("jsonwebtoken");

const { Blog } = require("../models/blog");
const { User } = require("../models/user");
const router = require("express").Router();
router.get("/", async (request, response) => {
  const data = await Blog.find({}).populate("creator", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(data);
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

router.post("/", async (request, response) => {
  const body = request.body;

  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    creator: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
});

router.delete("/:id", async (request, response) => {
  const deleted = await Blog.findByIdAndRemove({ _id: request.params.id });
  response.json(deleted);
});

router.put("/:id", async (request, response) => {
  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      likes: request.body.likes,
    },
    { new: true }
  );
  response.json(updated);
});

module.exports = router;

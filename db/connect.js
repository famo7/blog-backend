const mongoose = require("mongoose");
let url = "";
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  url = process.env.TEST_MONGO_URI;
} else {
  url = process.env.MONGO_URI;
}

console.log(url);
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("Connected!!");
  })
  .catch((e) => {
    console.log(e);
  });

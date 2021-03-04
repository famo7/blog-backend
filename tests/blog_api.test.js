const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const api = request(app);

app.listen(5000, () => {
  console.log("Server has started!");
});

describe("get all and add one", () => {
  let len = 0;
  test("how many blogs", async () => {
    const response = await api.get("/api/blogs");
    len = response.body.length;
    expect(response.body).toHaveLength(5);
  });

  test("add one blog", async () => {
    const response = await api.post("/api/blogs").send({
      title: "test",
      author: "aaaa",
      url: "cccc.dsad",
      likes: 11,
    });

    expect(len + 1).toBe(6);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

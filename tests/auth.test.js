const request = require("supertest");
const app = require("../src/app");
const { connectTestDB, clearTestDB, closeTestDB } = require("./testSetup");

beforeAll(connectTestDB);
beforeEach(clearTestDB);
afterAll(closeTestDB);

describe("Auth endpoints", () => {
  test("GET / returns 200", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Accessories E-commerce API is running");
  });

  test("POST /api/auth/register registers user and returns token", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Mariam",
      email: "mariam@example.com",
      password: "123456",
      profilePicture: "avatar.jpg",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe("mariam@example.com");
  });

  test("POST /api/auth/login logs in user and returns token", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Mariam",
      email: "mariam@example.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "mariam@example.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("PUT /api/auth/profile rejects invalid profile picture extension", async () => {
    const registerRes = await request(app).post("/api/auth/register").send({
      name: "Mariam",
      email: "mariam@example.com",
      password: "123456",
    });

    const res = await request(app)
      .put("/api/auth/profile")
      .set("Authorization", `Bearer ${registerRes.body.token}`)
      .send({ profilePicture: "file.pdf" });

    expect(res.statusCode).toBe(400);
  });
});

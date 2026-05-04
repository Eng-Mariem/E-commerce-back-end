const request = require("supertest");
const app = require("../src/app");
const {
  connectTestDB,
  clearTestDB,
  closeTestDB,
  createUserWithToken,
  createProduct,
} = require("./testSetup");

beforeAll(connectTestDB);
beforeEach(clearTestDB);
afterAll(closeTestDB);

describe("Feedback endpoints", () => {
  test("POST /api/feedback adds feedback for product", async () => {
    const { token } = await createUserWithToken();
    const product = await createProduct();

    const res = await request(app)
      .post("/api/feedback")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: product._id.toString(),
        rating: 5,
        comment: "Excellent accessory",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.feedback.rating).toBe(5);
  });
});

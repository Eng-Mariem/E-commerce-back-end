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

describe("Order endpoints", () => {
  test("POST /api/orders creates order from cart", async () => {
    const { token } = await createUserWithToken();
    const product = await createProduct();

    await request(app)
      .post("/api/cart/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ productId: product._id.toString(), quantity: 1 });

    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ shippingAddress: "Cairo, Egypt" });

    expect(res.statusCode).toBe(201);
    expect(res.body.order.shippingAddress).toBe("Cairo, Egypt");
  });
});

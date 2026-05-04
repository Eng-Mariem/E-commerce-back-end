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

describe("Cart endpoints", () => {
  test("POST /api/cart/add adds product to cart", async () => {
    const { token } = await createUserWithToken();
    const product = await createProduct();

    const res = await request(app)
      .post("/api/cart/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ productId: product._id.toString(), quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.cart.items.length).toBe(1);
    expect(res.body.cart.totalPrice).toBe(300);
  });
});

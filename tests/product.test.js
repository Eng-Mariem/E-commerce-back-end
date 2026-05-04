const request = require("supertest");
const app = require("../src/app");
const {
  connectTestDB,
  clearTestDB,
  closeTestDB,
  createUserWithToken,
} = require("./testSetup");

beforeAll(connectTestDB);
beforeEach(clearTestDB);
afterAll(closeTestDB);

describe("Product endpoints", () => {
  test("GET /api/products returns products list", async () => {
    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  test("POST /api/products creates product as admin", async () => {
    const { token } = await createUserWithToken("admin");

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Silver Necklace",
        description: "Elegant necklace",
        price: 300,
        category: "necklaces",
        image: "necklace.jpg",
        stock: 5,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.product.name).toBe("Silver Necklace");
  });
});

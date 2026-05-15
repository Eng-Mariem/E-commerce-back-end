const request = require("supertest");
const app = require("../src/app");
const Cart = require("../src/models/Cart");
const Order = require("../src/models/Order");
const Product = require("../src/models/Product");
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
  test("POST /api/orders creates order from cart and decreases product stock", async () => {
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
    expect(res.body.order.status).toBe("pending");

    const updatedProduct = await Product.findById(product._id);
    expect(updatedProduct.stock).toBe(19);
  });

  test("POST /api/orders returns 400 when stock is insufficient and keeps cart unchanged", async () => {
    const { user, token } = await createUserWithToken();
    const product = await createProduct();

    product.stock = 2;
    await product.save();

    await request(app)
      .post("/api/cart/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ productId: product._id.toString(), quantity: 3 });

    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ shippingAddress: "Cairo, Egypt" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      success: false,
      message: "Insufficient stock for Gold Bracelet",
    });

    const updatedProduct = await Product.findById(product._id);
    expect(updatedProduct.stock).toBe(2);

    const cart = await Cart.findOne({ user: user._id });
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(3);

    const orders = await Order.find({ user: user._id });
    expect(orders).toHaveLength(0);
  });
});

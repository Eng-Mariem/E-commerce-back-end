const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../src/models/User");
const Product = require("../src/models/Product");
const Cart = require("../src/models/Cart");
const Order = require("../src/models/Order");
const Feedback = require("../src/models/Feedback");
const generateToken = require("../src/utils/generateToken");

let mongoServer;

const connectTestDB = async () => {
  process.env.JWT_SECRET = "test_secret_key";

  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }
};

const clearTestDB = async () => {
  await User.deleteMany({});
  await Product.deleteMany({});
  await Cart.deleteMany({});
  await Order.deleteMany({});
  await Feedback.deleteMany({});
};

const closeTestDB = async () => {
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

const createUserWithToken = async (role = "user") => {
  const user = await User.create({
    name: `${role} User`,
    email: `${role}${Date.now()}@example.com`,
    password: "123456",
    role,
  });

  return { user, token: generateToken(user._id) };
};

const createProduct = async () => {
  return Product.create({
    name: "Gold Bracelet",
    description: "Beautiful bracelet for daily use",
    price: 150,
    category: "bracelets",
    image: "bracelet.jpg",
    stock: 20,
  });
};

module.exports = {
  connectTestDB,
  clearTestDB,
  closeTestDB,
  createUserWithToken,
  createProduct,
};

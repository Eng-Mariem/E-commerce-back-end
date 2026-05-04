const Cart = require("../models/Cart");
const Product = require("../models/Product");

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

const getUserCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
  }

  return cart;
};

const getCart = async (req, res, next) => {
  try {
    const cart = await getUserCart(req.user._id);
    await cart.populate("items.product");

    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const amount = Number(quantity) || 1;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const product = await Product.findOne({ _id: productId, isActive: true });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const cart = await getUserCart(req.user._id);
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += amount;
    } else {
      cart.items.push({
        product: productId,
        quantity: amount,
        price: product.price,
      });
    }

    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await getUserCart(req.user._id);
    const item = cart.items.find(
      (cartItem) => cartItem.product.toString() === req.params.productId,
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }

    if (Number(quantity) <= 0) {
      cart.items = cart.items.filter(
        (cartItem) => cartItem.product.toString() !== req.params.productId,
      );
    } else {
      item.quantity = Number(quantity);
    }

    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const cart = await getUserCart(req.user._id);

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId,
    );
    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cart = await getUserCart(req.user._id);

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Cart cleared successfully", cart });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  calculateTotal,
};

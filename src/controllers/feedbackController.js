const Feedback = require("../models/Feedback");
const Product = require("../models/Product");

const addFeedback = async (req, res, next) => {
  try {
    const { product, productId, rating, comment } = req.body;
    const selectedProduct = productId || product;

    if (!selectedProduct || !rating) {
      return res
        .status(400)
        .json({ success: false, message: "Product and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ success: false, message: "Rating must be between 1 and 5" });
    }

    const existingProduct = await Product.findOne({
      _id: selectedProduct,
      isActive: true,
    });

    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const feedback = await Feedback.create({
      user: req.user._id,
      product: selectedProduct,
      rating,
      comment,
    });

    res.status(201).json({ success: true, feedback });
  } catch (error) {
    next(error);
  }
};

const getFeedbackByProduct = async (req, res, next) => {
  try {
    const feedback = await Feedback.find({ product: req.params.productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: feedback.length, feedback });
  } catch (error) {
    next(error);
  }
};

const deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }

    const isOwner = feedback.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to delete this feedback",
      });
    }

    await feedback.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addFeedback,
  getFeedbackByProduct,
  deleteFeedback,
};

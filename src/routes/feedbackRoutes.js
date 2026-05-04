const express = require("express");
const {
  addFeedback,
  getFeedbackByProduct,
  deleteFeedback,
} = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addFeedback);
router.get("/product/:productId", getFeedbackByProduct);
router.delete("/:id", authMiddleware, deleteFeedback);

module.exports = router;

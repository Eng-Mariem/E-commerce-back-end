const cors = require("cors");
const express = require("express");
const swaggerSpec = require("./config/swagger");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Accessories E-commerce API is running" });
});

app.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerSpec);
});

app.get("/api-docs", (req, res) => {
  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Accessories E-commerce API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script>
      window.onload = function () {
        window.ui = SwaggerUIBundle({
          url: "/swagger.json",
          dom_id: "#swagger-ui"
        });
      };
    </script>
  </body>
</html>
`);
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/feedback", feedbackRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;

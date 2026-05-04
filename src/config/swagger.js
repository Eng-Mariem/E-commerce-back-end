const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Accessories E-commerce API",
      version: "1.0.0",
      description:
        "Backend API documentation for an accessories e-commerce course project.",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      "/": {
        get: {
          summary: "Default API health endpoint",
          responses: {
            200: {
              description: "API is running",
            },
          },
        },
      },
      "/api/auth/register": {
        post: {
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: {
                  name: "Mariam",
                  email: "mariam@example.com",
                  password: "123456",
                  profilePicture: "profile.jpg",
                },
              },
            },
          },
          responses: {
            201: { description: "User registered with JWT token" },
            400: { description: "Validation error" },
          },
        },
      },
      "/api/auth/login": {
        post: {
          summary: "Login user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: { email: "mariam@example.com", password: "123456" },
              },
            },
          },
          responses: {
            200: { description: "User logged in with JWT token" },
            401: { description: "Invalid credentials" },
          },
        },
      },
      "/api/auth/profile": {
        get: {
          summary: "Get current user profile",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "User profile" },
            401: { description: "Unauthorized" },
          },
        },
        put: {
          summary: "Update current user profile",
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              "application/json": {
                example: {
                  name: "New Name",
                  email: "new@example.com",
                  profilePicture: "avatar.png",
                },
              },
            },
          },
          responses: {
            200: { description: "Profile updated" },
            400: { description: "Invalid profile picture" },
          },
        },
      },
      "/api/products": {
        get: {
          summary:
            "Get active products with optional search and category filter",
          responses: { 200: { description: "Products list" } },
        },
        post: {
          summary: "Create product as admin",
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              "application/json": {
                example: {
                  name: "Silver Ring",
                  description: "Elegant accessory",
                  price: 250,
                  category: "rings",
                  image: "ring.jpg",
                  stock: 10,
                },
              },
            },
          },
          responses: {
            201: { description: "Product created" },
            403: { description: "Admin access required" },
          },
        },
      },
      "/api/products/{id}": {
        get: {
          summary: "Get single product",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Product found" },
            404: { description: "Product not found" },
          },
        },
        put: {
          summary: "Update product as admin",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: { 200: { description: "Product updated" } },
        },
        delete: {
          summary: "Soft delete product as admin",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: { 200: { description: "Product deleted" } },
        },
      },
      "/api/cart": {
        get: {
          summary: "Get current user cart",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "User cart" } },
        },
      },
      "/api/cart/add": {
        post: {
          summary: "Add product to cart",
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              "application/json": {
                example: { productId: "PRODUCT_ID", quantity: 2 },
              },
            },
          },
          responses: { 200: { description: "Cart updated" } },
        },
      },
      "/api/cart/update/{productId}": {
        put: {
          summary: "Update cart product quantity",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "productId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            content: { "application/json": { example: { quantity: 3 } } },
          },
          responses: { 200: { description: "Cart updated" } },
        },
      },
      "/api/cart/remove/{productId}": {
        delete: {
          summary: "Remove product from cart",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "productId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: { 200: { description: "Product removed" } },
        },
      },
      "/api/cart/clear": {
        delete: {
          summary: "Clear cart",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "Cart cleared" } },
        },
      },
      "/api/orders": {
        post: {
          summary: "Create order from cart",
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              "application/json": {
                example: { shippingAddress: "Cairo, Egypt" },
              },
            },
          },
          responses: { 201: { description: "Order created" } },
        },
        get: {
          summary: "Admin gets all orders",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "Orders list" } },
        },
      },
      "/api/orders/my-orders": {
        get: {
          summary: "Get current user orders",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "My orders" } },
        },
      },
      "/api/orders/{id}/status": {
        put: {
          summary: "Admin updates order status",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            content: {
              "application/json": { example: { status: "confirmed" } },
            },
          },
          responses: { 200: { description: "Status updated" } },
        },
      },
      "/api/feedback": {
        post: {
          summary: "Add product feedback",
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              "application/json": {
                example: {
                  productId: "PRODUCT_ID",
                  rating: 5,
                  comment: "Great product",
                },
              },
            },
          },
          responses: { 201: { description: "Feedback added" } },
        },
      },
      "/api/feedback/product/{productId}": {
        get: {
          summary: "Get feedback for product",
          parameters: [
            {
              name: "productId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: { 200: { description: "Feedback list" } },
        },
      },
      "/api/feedback/{id}": {
        delete: {
          summary: "Delete feedback as owner or admin",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: { 200: { description: "Feedback deleted" } },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);

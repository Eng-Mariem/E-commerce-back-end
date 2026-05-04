# Accessories E-commerce Backend

A clean, beginner-friendly Node.js backend for an accessories e-commerce web application. The project uses Express.js, local MongoDB, Mongoose, JWT authentication, bcrypt password hashing, Swagger documentation, and Jest/Supertest tests.

## Features

- User registration and login
- JWT authentication for protected routes
- bcrypt password hashing
- User profile and profile-picture validation
- Product browsing with search and category filter
- Admin product management
- User cart management
- Order creation from cart
- Admin order status management
- Product feedback and reviews
- Swagger API documentation at `/api-docs`
- Unit/API tests in the `tests` folder

## Technologies Used

- Node.js
- Express.js
- MongoDB Local
- Mongoose
- JWT
- bcrypt
- dotenv
- cors
- nodemon
- jest
- supertest
- swagger-ui-express
- swagger-jsdoc

## Folder Structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── tests/
├── docs/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Installation Steps

1. Open a terminal in the `backend` folder.
2. Install dependencies:

```bash
npm install
```

3. Make sure local MongoDB is running on your computer.
4. Check `.env` and confirm the connection string:

```env
MONGO_URI=mongodb://127.0.0.1:27017/accessories_ecommerce
```

## How to Run the Project

Start in production mode:

```bash
npm start
```

Start in development mode with nodemon:

```bash
npm run dev
```

Open this URL in the browser:

```text
http://localhost:5000/
```

Expected response:

```json
{
  "success": true,
  "message": "Accessories E-commerce API is running"
}
```

## Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/accessories_ecommerce
JWT_SECRET=accessories_secret_key
NODE_ENV=development
```

## API Endpoints Summary

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update current user profile

### Products

- `GET /api/products` - Get all active products
- `GET /api/products/:id` - Get one product
- `POST /api/products` - Create product as admin
- `PUT /api/products/:id` - Update product as admin
- `DELETE /api/products/:id` - Soft delete product as admin

### Cart

- `GET /api/cart` - Get current user's cart
- `POST /api/cart/add` - Add product to cart
- `PUT /api/cart/update/:productId` - Update quantity
- `DELETE /api/cart/remove/:productId` - Remove product
- `DELETE /api/cart/clear` - Clear cart

### Orders

- `POST /api/orders` - Create order from cart
- `GET /api/orders/my-orders` - Get current user's orders
- `GET /api/orders` - Admin gets all orders
- `PUT /api/orders/:id/status` - Admin updates order status

### Feedback

- `POST /api/feedback` - Add feedback
- `GET /api/feedback/product/:productId` - Get product feedback
- `DELETE /api/feedback/:id` - Delete feedback

## How Authentication Works

When a user registers or logs in, the API returns a JWT token. Protected routes require this header:

```text
Authorization: Bearer YOUR_TOKEN_HERE
```

The backend verifies the token, finds the user, and attaches the user to `req.user`.

## Swagger Documentation

Run the server and open:

```text
http://localhost:5000/api-docs
```

## How to Test the Project

Run tests:

```bash
npm test
```

Tests use Jest, Supertest, and an in-memory MongoDB database.

## Local MongoDB Usage

This project uses local MongoDB with this database:

```text
mongodb://127.0.0.1:27017/accessories_ecommerce
```

Make sure MongoDB service is running before using `npm start` or `npm run dev`.

## Other Scripts

```bash
npm run lint
npm run format
npm run build
```

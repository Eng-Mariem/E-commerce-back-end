# Accessories E-commerce Backend

A clean, beginner-friendly Node.js backend for an accessories e-commerce web application. The project uses Express.js, MongoDB Atlas, Mongoose, JWT authentication, bcrypt password hashing, Swagger documentation, and Jest/Supertest tests.

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
- MongoDB Atlas
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

3. Create a `.env` file from `.env.example`.
4. Add your real MongoDB Atlas connection string only in `.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/accessories_ecommerce?retryWrites=true&w=majority&appName=Cluster0
```

The real `.env` file is ignored by Git and must never be committed.

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
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/accessories_ecommerce?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

The backend loads configuration from environment variables using `dotenv`. Store the real MongoDB Atlas URI only in `.env`. The `.env.example` file contains safe placeholder values only and must not include real usernames, passwords, or connection strings.

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

## MongoDB Atlas Usage

This project uses MongoDB Atlas through `process.env.MONGO_URI`.

```text
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/accessories_ecommerce?retryWrites=true&w=majority&appName=Cluster0
```

The database name is `accessories_ecommerce`. MongoDB Atlas automatically creates the database and collections after the first successful document insert.

Main collections:

- `users`
- `products`
- `carts`
- `orders`
- `feedbacks`

## Other Scripts

```bash
npm run lint
npm run format
npm run build
```

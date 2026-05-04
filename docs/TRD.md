# Technical Requirements Document

## Backend Architecture

The backend uses an MVC-like structure:

- Models define database schemas.
- Controllers contain request processing logic.
- Routes group related API endpoints.
- Middleware handles authentication, authorization, errors, and unknown routes.
- Config files handle database and Swagger setup.

## Components

- `src/app.js` configures Express middleware and routes.
- `src/server.js` starts the server and connects to MongoDB.
- `src/config/db.js` connects to MongoDB Atlas using `process.env.MONGO_URI`.
- `src/config/swagger.js` configures Swagger API docs.

## Tools and Libraries

- Express.js for API routing.
- Mongoose for MongoDB models.
- bcrypt for password hashing.
- jsonwebtoken for JWT authentication.
- dotenv for environment variables.
- cors for cross-origin requests.
- jest and supertest for tests.
- swagger-ui-express and swagger-jsdoc for API documentation.

## Database

The app uses MongoDB Atlas. The connection string is loaded from environment variables using `dotenv` and must be stored only in the ignored `.env` file.

```text
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/accessories_ecommerce?retryWrites=true&w=majority&appName=Cluster0
```

The `.env` file is ignored by Git and must never be committed. The `.env.example` file contains safe placeholder values only and must not include real usernames, passwords, or connection strings.

The database name is `accessories_ecommerce`. MongoDB Atlas automatically creates the database and collections after the first successful document insert.

Main collections:

- `users`
- `products`
- `carts`
- `orders`
- `feedbacks`

## JWT Authentication

JWT tokens are generated after registration and login. Protected routes expect the token in the `Authorization` header as `Bearer TOKEN`.

## bcrypt Password Security

Passwords are hashed in the User model before saving using Mongoose pre-save middleware.

## dotenv Environment Variables

Important configuration values are stored in `.env`, including `PORT`, `MONGO_URI`, `JWT_SECRET`, and `NODE_ENV`. Real secrets must stay only in `.env`; documentation and `.env.example` must use placeholders.

## Middleware Structure

- `authMiddleware` validates JWT tokens.
- `adminMiddleware` checks if the authenticated user is an admin.
- `errorMiddleware` returns clean JSON error responses.
- `notFoundMiddleware` handles unknown routes with 404.

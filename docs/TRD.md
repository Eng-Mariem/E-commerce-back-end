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
- `src/config/db.js` connects to the local MongoDB database.
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

The app uses local MongoDB:

```text
mongodb://127.0.0.1:27017/accessories_ecommerce
```

## JWT Authentication

JWT tokens are generated after registration and login. Protected routes expect the token in the `Authorization` header as `Bearer TOKEN`.

## bcrypt Password Security

Passwords are hashed in the User model before saving using Mongoose pre-save middleware.

## dotenv Environment Variables

Important configuration values are stored in `.env`, including `PORT`, `MONGO_URI`, `JWT_SECRET`, and `NODE_ENV`.

## Middleware Structure

- `authMiddleware` validates JWT tokens.
- `adminMiddleware` checks if the authenticated user is an admin.
- `errorMiddleware` returns clean JSON error responses.
- `notFoundMiddleware` handles unknown routes with 404.

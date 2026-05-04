# API Documentation

Base URL: `http://localhost:5000`

For protected routes, send:

```text
Authorization: Bearer YOUR_TOKEN
```

## Default

### GET `/`

- Description: Check if API is running.
- Auth: No
- Success: `200 OK`

```json
{ "success": true, "message": "Accessories E-commerce API is running" }
```

## Authentication

### POST `/api/auth/register`

- Description: Register new user.
- Auth: No
- Body:

```json
{
  "name": "Mariam",
  "email": "mariam@example.com",
  "password": "123456",
  "profilePicture": "avatar.jpg"
}
```

- Success: `201 Created`
- Error: `400 Bad Request`

### POST `/api/auth/login`

- Description: Login user.
- Auth: No
- Body:

```json
{ "email": "mariam@example.com", "password": "123456" }
```

- Success: `200 OK`
- Error: `401 Unauthorized`

### GET `/api/auth/profile`

- Description: Get current user profile.
- Auth: Yes
- Success: `200 OK`
- Error: `401 Unauthorized`

### PUT `/api/auth/profile`

- Description: Update profile.
- Auth: Yes
- Body:

```json
{
  "name": "New Name",
  "email": "new@example.com",
  "profilePicture": "avatar.png"
}
```

- Success: `200 OK`
- Error: `400 Bad Request`

## Products

### GET `/api/products`

- Description: Get active products. Supports `?search=ring&category=rings`.
- Auth: No
- Success: `200 OK`

### GET `/api/products/:id`

- Description: Get single product.
- Auth: No
- Success: `200 OK`
- Error: `404 Not Found`

### POST `/api/products`

- Description: Create product.
- Auth: Admin
- Body:

```json
{
  "name": "Silver Ring",
  "description": "Elegant ring",
  "price": 250,
  "category": "rings",
  "image": "ring.jpg",
  "stock": 10
}
```

- Success: `201 Created`
- Error: `403 Forbidden`

### PUT `/api/products/:id`

- Description: Update product.
- Auth: Admin
- Body: Any product fields to update.
- Success: `200 OK`
- Error: `404 Not Found`

### DELETE `/api/products/:id`

- Description: Soft delete product by setting `isActive` to false.
- Auth: Admin
- Success: `200 OK`
- Error: `404 Not Found`

## Cart

### GET `/api/cart`

- Description: Get current user's cart.
- Auth: Yes
- Success: `200 OK`

### POST `/api/cart/add`

- Description: Add product to cart.
- Auth: Yes
- Body:

```json
{ "productId": "PRODUCT_ID", "quantity": 2 }
```

- Success: `200 OK`
- Error: `404 Not Found`

### PUT `/api/cart/update/:productId`

- Description: Update product quantity in cart.
- Auth: Yes
- Body:

```json
{ "quantity": 3 }
```

- Success: `200 OK`
- Error: `404 Not Found`

### DELETE `/api/cart/remove/:productId`

- Description: Remove product from cart.
- Auth: Yes
- Success: `200 OK`

### DELETE `/api/cart/clear`

- Description: Clear cart.
- Auth: Yes
- Success: `200 OK`

## Orders

### POST `/api/orders`

- Description: Create order from current user's cart.
- Auth: Yes
- Body:

```json
{ "shippingAddress": "Cairo, Egypt" }
```

- Success: `201 Created`
- Error: `400 Bad Request`

### GET `/api/orders/my-orders`

- Description: Get current user's orders.
- Auth: Yes
- Success: `200 OK`

### GET `/api/orders`

- Description: Admin gets all orders.
- Auth: Admin
- Success: `200 OK`
- Error: `403 Forbidden`

### PUT `/api/orders/:id/status`

- Description: Admin updates order status.
- Auth: Admin
- Body:

```json
{ "status": "confirmed" }
```

- Success: `200 OK`
- Error: `400 Bad Request`

## Feedback

### POST `/api/feedback`

- Description: Add feedback for a product.
- Auth: Yes
- Body:

```json
{ "product": "PRODUCT_ID", "rating": 5, "comment": "Great product" }
```

- Success: `201 Created`
- Error: `400 Bad Request`

### GET `/api/feedback/product/:productId`

- Description: Get feedback for a product.
- Auth: No
- Success: `200 OK`

### DELETE `/api/feedback/:id`

- Description: Delete own feedback or any feedback as admin.
- Auth: Yes
- Success: `200 OK`
- Error: `403 Forbidden`

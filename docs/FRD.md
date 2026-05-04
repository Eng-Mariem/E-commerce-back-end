# Functional Requirements Document

## User Registration and Login

Users can create an account using name, email, and password. Passwords are hashed before saving. After registration or login, the user receives a JWT token.

## Product Browsing and Ordering

Users can browse active products, search by product name, and filter by category. Users can add products to the cart and create an order using a shipping address.

## Cart Management

Users can view their cart, add products, update product quantities, remove products, and clear the cart.

## Order Management

Users can create orders from their cart and view their own orders. Admins can view all orders and update order status.

## Feedback Management

Authenticated users can add feedback for products. Product feedback is public. Users can delete their own feedback, while admins can delete any feedback.

## Profile Management

Authenticated users can view and update their profile. Profile picture values are validated to accept common image extensions: `.jpg`, `.jpeg`, `.png`, and `.webp`.

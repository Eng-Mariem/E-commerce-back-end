# Project Overview

## Introduction

Accessories E-commerce Backend is a Node.js and Express.js API for selling accessories such as rings, bracelets, necklaces, watches, and similar products.

## Objectives

- Build a simple and scalable backend structure.
- Support user registration and login.
- Allow users to browse products, manage carts, create orders, and add feedback.
- Allow admins to manage products and orders.
- Secure protected routes using JWT authentication.

## Scope

The backend covers authentication, products, carts, orders, feedback, error handling, Swagger documentation, and basic API tests.

## Deployment

The backend is deployed on Vercel:

```text
https://e-commerce-back-end-sage.vercel.app
```

The API base URL is:

```text
https://e-commerce-back-end-sage.vercel.app/api
```

Swagger documentation is available at:

```text
https://e-commerce-back-end-sage.vercel.app/api-docs
```

## Entities and Roles

### User

A customer who can register, login, view products, manage cart, create orders, and write feedback.

### Admin

A special user who can create, update, and delete products. Admins can also view all orders and update order status.

### Product

An accessory item available for browsing and ordering.

### Cart

A temporary collection of products selected by a user before checkout.

### Order

A confirmed purchase created from the user's cart.

### Feedback

A rating and comment added by a user for a product.
